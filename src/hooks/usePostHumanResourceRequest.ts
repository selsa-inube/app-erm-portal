import { useState } from "react";

import { Logger } from "@utils/logger";
import { formatWithOffset } from "@utils/date";
import {
  IUnifiedHumanResourceRequestData,
  ERequestType,
} from "@ptypes/humanResourcesRequest.types";
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

function isOnboardingData(data: FormValues) {
  return (
    "names" in data && "lastNames" in data && "identificationNumber" in data
  );
}

export function useRequestSubmission(
  formValues: FormValues,
  typeRequest: ERequestType,
  userCodeInCharge: string,
  userNameInCharge: string,
) {
  const [requestNum, setRequestNum] = useState("");
  const { selectedEmployee } = useAppContext();

  const { submitRequestToAPI, errorMessage, humanResourceRequestId } =
    useRequestSubmissionAPI();

  const { navigateAfterSubmission } = useRequestNavigation();

  const submitRequestHandler = async () => {
    try {
      let humanResourceRequestData: string;

      if (typeRequest === ERequestType.certification) {
        humanResourceRequestData = JSON.stringify({
          certificationType: formValues.certificationType ?? "",
          addressee: formValues.addressee ?? "",
          contractId: formValues.contractId ?? "",
          contractNumber: formValues.contractNumber ?? "",
          businessName: formValues.businessName ?? "",
          contractType: formValues.contractType ?? "",
          observationEmployee: formValues.observationEmployee ?? "",
        });
      } else if (
        typeRequest === ERequestType.paid_vacations &&
        isVacationPaymentData(formValues)
      ) {
        humanResourceRequestData = JSON.stringify({
          daysToPay: formValues.daysToPay ?? "",
          disbursementDate: "",
          contractId: formValues.contractId ?? "",
          contractNumber: formValues.contractNumber ?? "",
          businessName: formValues.businessName ?? "",
          contractType: formValues.contractType ?? "",
          observationEmployee: formValues.observationEmployee ?? "",
        });
      } else if (
        typeRequest === ERequestType.vacations_enjoyed &&
        isVacationEnjoyedData(formValues)
      ) {
        humanResourceRequestData = JSON.stringify({
          daysOff: formValues.daysOff ?? "",
          startDateEnyoment: formValues.startDateEnyoment
            ? formatWithOffset(new Date(formValues.startDateEnyoment))
            : "",
          contractId: formValues.contractId ?? "",
          contractNumber: formValues.contractNumber ?? "",
          businessName: formValues.businessName ?? "",
          contractType: formValues.contractType ?? "",
          observationEmployee: formValues.observationEmployee ?? "",
        });
      } else if (
        typeRequest === ERequestType.onboarding &&
        isOnboardingData(formValues)
      ) {
        humanResourceRequestData = JSON.stringify({
          identificationNumber: formValues.identificationNumber ?? "",
          names: formValues.names ?? "",
          lastNames: formValues.lastNames ?? "",
          attachedFile: formValues.attachedFile ?? null,
          normativeFramework: formValues.normativeFramework ?? "",
          contractType: formValues.contractType ?? "",
          startDate: formValues.startDate
            ? formatWithOffset(new Date(formValues.startDate))
            : "",
          endDate: formValues.endDate
            ? formatWithOffset(new Date(formValues.endDate))
            : "",
          company: formValues.company ?? "",
          workingShift: formValues.workingShift ?? "",
          team: formValues.team ?? "",
          position: formValues.position ?? "",
          salaryProfile: formValues.salaryProfile ?? "",
          jobMode: formValues.jobMode ?? "",
          proyect: formValues.proyect ?? "",
          zonalSegmentation: formValues.zonalSegmentation ?? "",
          costCenter: formValues.costCenter ?? "",
          assignments: formValues.assignments ?? [],
        });
      } else {
        throw new Error("Tipo de solicitud no reconocido.");
      }

      const typeRequestKey = Object.keys(ERequestType).find(
        (key) => ERequestType[key as keyof typeof ERequestType] === typeRequest,
      ) as keyof typeof ERequestType;

      const requestBody = {
        employeeId: selectedEmployee.employeeId,
        humanResourceRequestData,
        humanResourceRequestDate: new Date().toISOString(),
        humanResourceRequestDescription: "request",
        humanResourceRequestStatus: "supervisor_approval",
        humanResourceRequestType: typeRequestKey as ERequestType,
        userCodeInCharge,
        userNameInCharge,
      };

      const { success, response } = await submitRequestToAPI(requestBody);

      if (success && response?.humanResourceRequestId) {
        setRequestNum(response.humanResourceRequestNumber);

        if (humanResourceRequestId) {
          navigateAfterSubmission(typeRequestKey);
        }

        return true;
      }

      return false;
    } catch (error) {
      Logger.error(
        "Error al enviar la solicitud",
        error instanceof Error ? error : new Error(String(error)),
      );
      return false;
    }
  };

  return {
    requestNum,
    submitRequestHandler,
    navigateAfterSubmission,
    errorMessage,
  };
}
