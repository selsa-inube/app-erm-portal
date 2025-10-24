import { useState, useEffect } from "react";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import {
  HumanResourceRequest,
  ERequestType,
  requestTypeMap,
  requestTypeLabels,
} from "@ptypes/humanResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_FETCH_HR_REQUESTS_FAILED = 1013;

export const useHumanResourceRequests = <T>(
  formatData: (data: HumanResourceRequest[]) => T[],
  typeRequest?: ERequestType,
  employeeId?: string,
) => {
  const [data, setData] = useState<T[]>([]);
  const [rawData, setRawData] = useState<HumanResourceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();
  const { selectedEmployee } = useAppContext();
  const { showErrorModal } = useErrorModal();

  const effectiveEmployeeId = employeeId ?? selectedEmployee?.employeeId;

  const fetchData = async () => {
    if (!effectiveEmployeeId) return;
    setIsLoading(true);

    try {
      const headers = await getHeaders();
      const backendType = typeRequest ? requestTypeMap[typeRequest] : undefined;

      const requests = await getHumanResourceRequests(
        effectiveEmployeeId,
        headers,
        backendType,
      );

      const requestsData = requests ?? [];
      setRawData(requestsData);
      setData(formatData(requestsData));
      setError(null);
    } catch (err) {
      const errorInstance = err instanceof Error ? err : new Error(String(err));

      console.error("Error al obtener solicitudes de recursos humanos:", err);
      setError(errorInstance);
      setData([]);
      setRawData([]);

      const errorConfig = modalErrorConfig[ERROR_CODE_FETCH_HR_REQUESTS_FAILED];
      const descriptionText = typeRequest
        ? `${errorConfig.descriptionText} (Tipo: "${requestTypeLabels[typeRequest]}") ${String(err)}`
        : errorConfig.descriptionText;

      showErrorModal({
        descriptionText,
        solutionText: errorConfig.solutionText,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [typeRequest, effectiveEmployeeId]);

  return { data, rawData, isLoading, error, refetch: fetchData };
};
