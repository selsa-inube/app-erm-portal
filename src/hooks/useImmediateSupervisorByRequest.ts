import { useState, useEffect } from "react";

import { getImmediateSupervisorByRequest } from "@services/humanResourcesRequest/getImmediateSupervisorByRequest";
import type { ImmediateSupervisorByRequest } from "@services/humanResourcesRequest/getImmediateSupervisorByRequest/mappers";
import { useHeaders } from "@hooks/useHeaders";
import { useSignOut } from "@hooks/useSignOut";
import { useErrorNavigation } from "@hooks/useErrorNavigation";

interface FlagOptions {
  flagMessage?: string;
  flagTitle?: string;
  flagIsSuccess?: boolean;
  flagDuration?: number;
}

interface UseImmediateSupervisorByRequestOptions {
  showFlag?: boolean;
  flagOptions?: FlagOptions;
}

export const useImmediateSupervisorByRequest = (
  humanResourceRequestId?: string,
  options?: UseImmediateSupervisorByRequestOptions,
) => {
  const [data, setData] = useState<ImmediateSupervisorByRequest>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();
  const { signOut } = useSignOut();
  const { buildErrorUrl } = useErrorNavigation();

  const fetchData = async () => {
    if (!humanResourceRequestId) return;

    setIsLoading(true);

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

      const errorUrl = buildErrorUrl(500, {
        showFlag: options?.showFlag,
        flagOptions: options?.flagOptions,
      });

      signOut(errorUrl);
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
