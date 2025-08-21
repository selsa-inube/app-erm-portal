import { useState, useEffect } from "react";

import { getImmediateSupervisorByRequest } from "@services/humanResourcesRequest/getImmediateSupervisorByRequest";
import type { ImmediateSupervisorByRequest } from "@services/humanResourcesRequest/getImmediateSupervisorByRequest/mappers";
import { useHeaders } from "@hooks/useHeaders";
import { useSignOut } from "@hooks/useSignOut";

import { useErrorFlag } from "./useErrorFlag";

export const useImmediateSupervisorByRequest = (
  humanResourceRequestId?: string,
) => {
  const [data, setData] = useState<ImmediateSupervisorByRequest>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [flagShown, setFlagShown] = useState(false);

  const { getHeaders } = useHeaders();
  const { signOut } = useSignOut();

  useErrorFlag(
    flagShown,
    "Error al obtener el supervisor inmediato",
    "Error en la solicitud",
    false,
    5000,
  );

  const fetchData = async () => {
    if (!humanResourceRequestId) return;

    setIsLoading(true);
    setFlagShown(false);

    try {
      const headers = await getHeaders();
      const supervisor = await getImmediateSupervisorByRequest(
        humanResourceRequestId,
        headers,
      );

      if (!supervisor) {
        signOut("/error?code=404");
        return;
      }

      setData(supervisor);
      setError(null);
    } catch (err) {
      const errorInstance = err instanceof Error ? err : new Error(String(err));
      setError(errorInstance);
      setFlagShown(true);

      setTimeout(() => {
        signOut("/error?code=500");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [humanResourceRequestId]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
