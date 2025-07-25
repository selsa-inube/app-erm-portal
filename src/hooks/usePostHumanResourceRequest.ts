import { useState } from "react";

import { formatDate } from "@utils/date";
import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";

import { useRequestSubmissionAPI } from "./useRequestSubmissionAPI";
import { useRequestNavigation } from "./useRequestNavigation";

type FormValues = IUnifiedHumanResourceRequestData;

function isVacationPaymentData(data: FormValues) {
  return "daysToPay" in data;
}

function isVacationEnjoyedData(data: FormValues) {
  return "daysOff" in data;
}

export function useRequestSubmission(
  formValues: FormValues,
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

      if (typeRequest === "Certification") {
        humanResourceRequestData = JSON.stringify({
          certificationType: formValues.certificationType ?? "",
          addressee: formValues.addressee ?? "",
          contractId: formValues.contractId ?? "",
          contractNumber: formValues.contractNumber ?? "",
          businessName: formValues.businessName ?? "",
          contractType: formValues.contractType ?? "",
          observationEmployee: formValues.observationEmployee ?? "",
        });
      } else if (isVacationPaymentData(formValues)) {
        humanResourceRequestData = JSON.stringify({
          daysToPay: formValues.daysToPay ?? "",
          disbursementDate: "",
          contractId: formValues.contractId ?? "",
          contractNumber: formValues.contractNumber ?? "",
          businessName: formValues.businessName ?? "",
          contractType: formValues.contractType ?? "",
          observationEmployee: formValues.observationEmployee ?? "",
        });
      } else if (isVacationEnjoyedData(formValues)) {
        humanResourceRequestData = JSON.stringify({
          daysOff: formValues.daysOff ?? "",
          startDateEnyoment: formValues.startDateEnyoment
            ? formatDate(formValues.startDateEnyoment)
            : "",
          contractId: formValues.contractId ?? "",
          contractNumber: formValues.contractNumber ?? "",
          businessName: formValues.businessName ?? "",
          contractType: formValues.contractType ?? "",
          observationEmployee: formValues.observationEmployee ?? "",
        });
      } else {
        throw new Error("Tipo de solicitud no reconocido.");
      }

      const requestBody = {
        employeeId: selectedEmployee.employeeId,
        humanResourceRequestData,
        humanResourceRequestDate: new Date().toISOString(),
        humanResourceRequestDescription: formValues.observationEmployee ?? "",
        humanResourceRequestStatus: "supervisor_approval",
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
      console.error("Error al enviar la solicitud:", error);
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
