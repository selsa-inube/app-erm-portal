import { useState } from "react";

import {
  IPatchHumanResourceResponse,
  IPatchRequestBody,
} from "@services/humanResourcesRequest/patchHumanResourceRequest/types";
import { patchHumanResourceRequest } from "@services/humanResourcesRequest/patchHumanResourceRequest";
import { useHeaders } from "@hooks/useHeaders";

import { useErrorFlag } from "./useErrorFlag";

export const usePatchHumanResourceRequest = () => {
  const [data, setData] = useState<IPatchHumanResourceResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [flagShown, setFlagShown] = useState(false);

  const { getHeaders } = useHeaders();

  useErrorFlag(
    flagShown,
    "Error al actualizar la solicitud de recursos humanos",
    "Error en la actualización",
    false,
  );

  const updateRequest = async (requestBody: IPatchRequestBody) => {
    setIsLoading(true);
    setFlagShown(false);
    setError(null);

    try {
      const headers = await getHeaders();
      const response = await patchHumanResourceRequest(requestBody, headers);
      setData(response);
      return response;
    } catch (err) {
      const errorInstance = err instanceof Error ? err : new Error(String(err));
      setError(errorInstance);
      setFlagShown(true);
      throw errorInstance;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setFlagShown(false);
  };

  return {
    data,
    isLoading,
    error,
    updateRequest,
    reset,
  };
};
