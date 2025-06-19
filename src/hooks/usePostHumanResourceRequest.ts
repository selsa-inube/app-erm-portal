import { useState } from "react";

import { formatDate } from "@utils/date";
import {
  HumanResourceRequestData,
  ICertificationData,
  IVacationPaymentData,
  IVacationEnjoyedData,
} from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";

import { useRequestSubmissionAPI } from "./useRequestSubmissionAPI";
import { useRequestNavigation } from "./useRequestNavigation";

function isVacationPaymentData(
  data: HumanResourceRequestData,
): data is IVacationPaymentData {
  return "daysToPay" in data;
}

function isVacationEnjoyedData(
  data: HumanResourceRequestData,
): data is IVacationEnjoyedData {
  return "daysOff" in data;
}

function isCertificationData(
  data: HumanResourceRequestData,
): data is ICertificationData {
  return "certificationType" in data && "addressee" in data;
}

export function useRequestSubmission(
  formValues: HumanResourceRequestData,
  typeRequest: string,
  userCodeInCharge: string,
  userNameInCharge: string,
) {
  const [requestNum, setRequestNum] = useState("");

  const { selectedEmployee } = useAppContext();

  const {
    submitRequestToAPI,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
    humanResourceRequestId,
  } = useRequestSubmissionAPI();

  const { navigateAfterSubmission } = useRequestNavigation();

  const submitRequestHandler = async () => {
    try {
      let humanResourceRequestData: string;

      if (isVacationPaymentData(formValues)) {
        humanResourceRequestData = JSON.stringify({
          daysToPay: formValues.daysToPay,
          contract: formValues.contract,
          observations: formValues.observations,
        });
      } else if (isVacationEnjoyedData(formValues)) {
        humanResourceRequestData = JSON.stringify({
          daysOff: formValues.daysOff,
          startDate: formatDate(formValues.startDate),
          contract: formValues.contract,
          observations: formValues.observations,
        });
      } else if (isCertificationData(formValues)) {
        humanResourceRequestData = JSON.stringify({
          certificationType: formValues.certificationType,
          addressee: formValues.addressee,
          contract: formValues.contract,
          observations: formValues.observations,
        });
      } else {
        throw new Error("Tipo de solicitud no reconocido.");
      }

      const requestBody = {
        employeeId: selectedEmployee.employeeId,
        humanResourceRequestData,
        humanResourceRequestDate: new Date().toISOString(),
        humanResourceRequestDescription: formValues.observations ?? "",
        humanResourceRequestStatus: "InProgress",
        humanResourceRequestType: typeRequest,
        userCodeInCharge,
        userNameInCharge,
      };

      const { success, response } = await submitRequestToAPI(requestBody);

      if (success && response?.humanResourceRequestId) {
        setRequestNum(response.humanResourceRequestNumber);

        if (humanResourceRequestId) {
          navigateAfterSubmission(typeRequest);
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error("Error in request handler:", error);
      return false;
    }
  };

  return {
    requestNum,
    submitRequestHandler,
    navigateAfterSubmission,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  };
}
