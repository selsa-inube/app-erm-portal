import { useState, useEffect } from "react";

import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import {
  HumanResourceRequest,
  ERequestType,
} from "@ptypes/humanResourcesRequest.types";
import { useHeaders } from "@hooks/useHeaders";
import { useAppContext } from "@context/AppContext";

import { useErrorFlag } from "./useErrorFlag";

type RequestType = keyof typeof ERequestType;

export const useHumanResourceRequests = <T>(
  typeRequest: RequestType,
  formatData: (data: HumanResourceRequest[]) => T[],
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [flagShown, setFlagShown] = useState(false);

  const { getHeaders } = useHeaders();
  const { selectedEmployee } = useAppContext();

  useErrorFlag(
    flagShown,
    `Error al obtener solicitudes de tipo "${ERequestType[typeRequest]}"`,
    "Error en la solicitud",
    false,
  );

  const fetchData = async () => {
    setIsLoading(true);
    setFlagShown(false);
    try {
      const headers = await getHeaders();
      const requests = await getHumanResourceRequests(
        typeRequest,
        selectedEmployee.employeeId,
        headers,
      );
      setData(formatData(requests ?? []));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData([]);
      setFlagShown(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedEmployee.employeeId) {
      fetchData();
    }
  }, [typeRequest, selectedEmployee.employeeId]);

  return { data, isLoading, error, refetch: fetchData };
};
