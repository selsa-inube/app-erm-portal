import { useState, useEffect } from "react";

import { getImmediateSupervisorByRequest } from "@services/humanResourcesRequest/getImmediateSupervisorByRequest";
import type { ImmediateSupervisorByRequest } from "@services/humanResourcesRequest/getImmediateSupervisorByRequest/mappers";
import { useHeaders } from "@hooks/useHeaders";
import { useSignOut } from "@hooks/useSignOut";

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

  const defaultFlagOptions: FlagOptions = {
    flagMessage: "Error interno del servidor",
    flagTitle: "Error de Sistema",
    flagIsSuccess: false,
    flagDuration: 10000,
  };

  const buildErrorUrl = (
    code: number,
    shouldShowFlag: boolean,
    flagConfig?: FlagOptions,
  ) => {
    const params = new URLSearchParams();
    params.append("code", code.toString());

    if (shouldShowFlag && flagConfig) {
      params.append("showFlag", "true");

      if (flagConfig.flagMessage) {
        params.append(
          "flagMessage",
          encodeURIComponent(flagConfig.flagMessage),
        );
      }
      if (flagConfig.flagTitle) {
        params.append("flagTitle", encodeURIComponent(flagConfig.flagTitle));
      }
      if (flagConfig.flagIsSuccess !== undefined) {
        params.append("flagIsSuccess", flagConfig.flagIsSuccess.toString());
      }
      if (flagConfig.flagDuration !== undefined) {
        params.append("flagDuration", flagConfig.flagDuration.toString());
      }
    }

    return `/error?${params.toString()}`;
  };

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

      const shouldShowFlag = options?.showFlag !== false;

      const finalFlagOptions = shouldShowFlag
        ? { ...defaultFlagOptions, ...options?.flagOptions }
        : undefined;

      const errorUrl = buildErrorUrl(500, shouldShowFlag, finalFlagOptions);
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
