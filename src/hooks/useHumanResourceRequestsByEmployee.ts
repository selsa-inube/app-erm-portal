import { useState, useEffect } from "react";
import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";

export const useHumanResourceRequestsByEmployee = <T>(
  employeeId: string,
  formatData: (data: HumanResourceRequest[]) => T[],
  typeRequest?: string,
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getHeaders } = useHeaders();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const headers = await getHeaders();
      const requests = await getHumanResourceRequests(
        employeeId,
        headers,
        typeRequest,
      );
      setData(formatData(requests ?? []));
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Error al obtener solicitudes de recursos humanos"),
      );
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchData();
    }
  }, [typeRequest, employeeId]);

  return { data, isLoading, error, refetch: fetchData };
};
