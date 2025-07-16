import { useState, useEffect } from "react";

import { getStaffUseCases } from "@services/staffPortal/getStaffUseCases";
import { useHeaders } from "@hooks/useHeaders";

import { useErrorFlag } from "./useErrorFlag";

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
  const [flagShown, setFlagShown] = useState(false);

  const { getHeaders } = useHeaders();

  useErrorFlag(
    flagShown,
    "Error al obtener los casos de uso del staff",
    "Error en la solicitud",
    false,
  );

  const fetchData = async () => {
    if (!businessManagerCode || !businessUnitCode) return;

    setIsLoading(true);
    setFlagShown(false);

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
      setError(err instanceof Error ? err : new Error(String(err)));
      setData([]);
      setRawData([]);
      setFlagShown(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [businessManagerCode, businessUnitCode]);

  return { data, rawData, isLoading, error, refetch: fetchData };
};
