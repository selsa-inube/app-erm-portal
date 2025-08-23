import { useCallback } from "react";

interface FlagOptions {
  flagMessage?: string;
  flagTitle?: string;
  flagIsSuccess?: boolean;
  flagDuration?: number;
}

interface ErrorNavigationOptions {
  showFlag?: boolean;
  flagOptions?: FlagOptions;
}

export const useErrorNavigation = () => {
  const defaultFlagOptions: FlagOptions = {
    flagMessage: "Error interno del servidor",
    flagTitle: "Error de Sistema",
    flagIsSuccess: false,
    flagDuration: 10000,
  };

  const buildErrorUrl = useCallback(
    (code: number, options?: ErrorNavigationOptions) => {
      const params = new URLSearchParams();
      params.append("code", code.toString());

      const shouldShowFlag = options?.showFlag !== false;

      if (shouldShowFlag && options?.flagOptions) {
        const finalFlagOptions = {
          ...defaultFlagOptions,
          ...options.flagOptions,
        };

        params.append("showFlag", "true");

        if (finalFlagOptions.flagMessage) {
          params.append(
            "flagMessage",
            encodeURIComponent(finalFlagOptions.flagMessage),
          );
        }
        if (finalFlagOptions.flagTitle) {
          params.append(
            "flagTitle",
            encodeURIComponent(finalFlagOptions.flagTitle),
          );
        }
        if (finalFlagOptions.flagIsSuccess !== undefined) {
          params.append(
            "flagIsSuccess",
            finalFlagOptions.flagIsSuccess.toString(),
          );
        }
        if (finalFlagOptions.flagDuration !== undefined) {
          params.append(
            "flagDuration",
            finalFlagOptions.flagDuration.toString(),
          );
        }
      }

      return `/error?${params.toString()}`;
    },
    [],
  );

  return { buildErrorUrl };
};
