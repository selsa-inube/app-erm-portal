import { useState, useEffect, useCallback, useRef } from "react";

import {
  getEmployeeVacationDays,
  IVacationDaysResponse,
} from "@services/employeeConsultation/getEmployeeVacationDays";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";

const ERROR_CODE_FETCH_VACATION_DAYS_FAILED = 1012;

interface UseEmployeeVacationDaysResult {
  vacationDays: IVacationDaysResponse[];
  loadingDays: boolean;
  error: string | null;
  refetch: () => void;
}

export const useEmployeeVacationDays = (
  employeeId: string | null,
): UseEmployeeVacationDaysResult => {
  const [vacationDays, setVacationDays] = useState<IVacationDaysResponse[]>([]);
  const [loadingDays, setLoadingDays] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  const lastFetchedEmployeeId = useRef<string>("");
  const isInitialMount = useRef(true);

  const fetchVacationDays = useCallback(
    async (forceRefetch = false) => {
      if (!employeeId) {
        setVacationDays([]);
        return;
      }

      if (
        !forceRefetch &&
        employeeId === lastFetchedEmployeeId.current &&
        !isInitialMount.current
      ) {
        return;
      }

      setLoadingDays(true);
      setError(null);
      lastFetchedEmployeeId.current = employeeId;
      isInitialMount.current = false;

      try {
        const headers = await getHeaders();
        const data = await getEmployeeVacationDays(employeeId, headers);
        setVacationDays(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ocurrió un error desconocido al obtener los días de vacaciones pendientes";

        console.error("Error al obtener los días de vacaciones:", err);
        setError(errorMessage);
        setVacationDays([]);

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
    fetchVacationDays(true);
  }, [fetchVacationDays]);

  return { vacationDays, loadingDays, error, refetch };
};
