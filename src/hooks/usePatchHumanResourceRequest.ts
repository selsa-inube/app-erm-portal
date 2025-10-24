import { useState } from "react";

import {
  IPatchHumanResourceResponse,
  IPatchRequestBody,
} from "@services/humanResourcesRequest/patchHumanResourceRequest/types";
import { patchHumanResourceRequest } from "@services/humanResourcesRequest/patchHumanResourceRequest";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_PATCH_REQUEST_FAILED = 1015;

export const usePatchHumanResourceRequest = () => {
  const [data, setData] = useState<IPatchHumanResourceResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  const updateRequest = async (requestBody: IPatchRequestBody) => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = await getHeaders();
      const response = await patchHumanResourceRequest(requestBody, headers);
      setData(response);
      return response;
    } catch (err) {
      const errorInstance = err instanceof Error ? err : new Error(String(err));

      console.error(
        "Error al actualizar la solicitud de recursos humanos:",
        err,
      );
      setError(errorInstance);

      const errorConfig = modalErrorConfig[ERROR_CODE_PATCH_REQUEST_FAILED];
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
        solutionText: errorConfig.solutionText,
      });

      throw errorInstance;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
  };

  return {
    data,
    isLoading,
    error,
    updateRequest,
    reset,
  };
};
