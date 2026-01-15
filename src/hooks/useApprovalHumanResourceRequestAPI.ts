import { useState } from "react";

import { Logger } from "@utils/logger";
import { postApprovalHumanResourceRequest } from "@services/humanResourcesRequest/postApprovalHumanResourceRequest";
import { IApprovalRequestBody } from "@services/humanResourcesRequest/postApprovalHumanResourceRequest/types";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_POST_APPROVAL_FAILED = 1024;

interface ISubmitApprovalParams {
  humanResourceRequestId: string;
  taskManagingId: string;
  actionExecuted: string;
  description: string;
  userWhoExecutedAction: string;
}

export function useApprovalHumanResourceRequestAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  const submitApproval = async ({
    humanResourceRequestId,
    taskManagingId,
    actionExecuted,
    description,
    userWhoExecutedAction,
  }: ISubmitApprovalParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = await getHeaders(true);

      const requestBody: IApprovalRequestBody = {
        actionExecuted,
        description,
        humanResourceRequestId,
        taskManagingId,
        userWhoExecutedAction,
      };

      const response = await postApprovalHumanResourceRequest(
        requestBody,
        headers,
      );

      if (response?.humanResourceRequestId) {
        return { success: true, response };
      }

      return { success: false };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      Logger.error("Error submitting approval", error, {
        humanResourceRequestId,
        actionExecuted,
      });

      setError(error);

      const errorConfig = modalErrorConfig[ERROR_CODE_POST_APPROVAL_FAILED];
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
        solutionText: errorConfig.solutionText,
      });

      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitApproval,
    isLoading,
    error,
  };
}
