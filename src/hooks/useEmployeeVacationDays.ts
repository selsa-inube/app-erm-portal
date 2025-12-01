import { useState, useEffect, useCallback, useRef } from "react";

import { Logger } from "@utils/logger";
import {
  getEmployeeVacationDays,
  IVacationDaysResponse,
} from "@services/employeeConsultation/getEmployeeVacationDays";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";

const ERROR_CODE_FETCH_VACATION_DAYS_FAILED = 1012;

export const useEmployeeVacationDays = (employeeId: string | null) => {
  const [vacationDays, setVacationDays] = useState<IVacationDaysResponse[]>([]);
  const [loadingDays, setLoadingDays] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  const lastFetchedEmployeeId = useRef<string>("");
  const isInitialMount = useRef(true);

  const fetchVacationDays = useCallback(
    async (forceRefetch = false) => {
      if (!employeeId) {
        Logger.debug("EmployeeId no proporcionado, se limpian vacaciones", {
          hook: "useEmployeeVacationDays",
        });
        setVacationDays([]);
        return;
      }

      if (
        !forceRefetch &&
        employeeId === lastFetchedEmployeeId.current &&
        !isInitialMount.current
      ) {
        Logger.debug("Fetch omitido: mismo employeeId", {
          employeeId,
          hook: "useEmployeeVacationDays",
        });
        return;
      }

      setLoadingDays(true);
      setError(null);
      lastFetchedEmployeeId.current = employeeId;
      isInitialMount.current = false;

      try {
        Logger.info("Iniciando petición de días de vacaciones", {
          employeeId,
          hook: "useEmployeeVacationDays",
        });

        const headers = await getHeaders();
        const data = await getEmployeeVacationDays(employeeId, headers);

        setVacationDays(data);

        Logger.info("Vacaciones obtenidas correctamente", {
          employeeId,
          totalDays: data.length,
        });
      } catch (err) {
        const errorInstance =
          err instanceof Error ? err : new Error(String(err));

        setError(errorInstance.message);
        setVacationDays([]);

        Logger.error("Error al obtener días de vacaciones", errorInstance, {
          employeeId,
          errorCode: ERROR_CODE_FETCH_VACATION_DAYS_FAILED,
          hook: "useEmployeeVacationDays",
        });

        const errorConfig =
          modalErrorConfig[ERROR_CODE_FETCH_VACATION_DAYS_FAILED];

        showErrorModal({
          descriptionText: errorConfig.descriptionText,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setLoadingDays(false);
      }
    },
    [employeeId, getHeaders, showErrorModal],
  );

  useEffect(() => {
    fetchVacationDays();
  }, [employeeId]);

  const refetch = useCallback(() => {
    Logger.debug("Refetch manual ejecutado", {
      employeeId,
      hook: "useEmployeeVacationDays",
    });
    fetchVacationDays(true);
  }, [fetchVacationDays, employeeId]);

  return { vacationDays, loadingDays, error, refetch };
};
