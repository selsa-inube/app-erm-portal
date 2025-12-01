import { useState, useEffect } from "react";

import { Logger } from "@utils/logger";
import { getStaffUseCases } from "@services/staffPortal/getStaffUseCases";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_FETCH_STAFF_USE_CASES_FAILED = 1017;

export const useStaffUseCases = <T>(
  businessManagerCode: string,
  businessUnitCode: string,
  id: string,
  formatData?: (data: string[]) => T[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [rawData, setRawData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  const fetchData = async () => {
    if (!businessManagerCode || !businessUnitCode) return;

    setIsLoading(true);

    try {
      const headers = await getHeaders();
      const staffUseCasesData = await getStaffUseCases(
        businessManagerCode,
        businessUnitCode,
        id,
        headers,
      );

      const responseData = staffUseCasesData ?? [];
      setRawData(responseData);

      if (formatData) {
        setData(formatData(responseData));
      } else {
        setData(responseData as T[]);
      }

      setError(null);
    } catch (err) {
      const errorInstance = err instanceof Error ? err : new Error(String(err));

      Logger.error(
        "Error al obtener los casos de uso del staff",
        errorInstance,
      );

      setError(errorInstance);
      setData([]);
      setRawData([]);

      const errorConfig =
        modalErrorConfig[ERROR_CODE_FETCH_STAFF_USE_CASES_FAILED];
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
        solutionText: errorConfig.solutionText,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [businessManagerCode, businessUnitCode]);

  return { data, rawData, isLoading, error, refetch: fetchData };
};
