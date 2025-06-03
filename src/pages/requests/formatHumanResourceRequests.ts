import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { formatDate } from "@utils/date";

import { Status } from "./types";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";

export const formatHumanResourceRequests = (
  requests: HumanResourceRequest[],
) => {
  function getRequestTypeTitle(type: string): string {
    if (type in ERequestType) {
      return ERequestType[type as keyof typeof ERequestType];
    }
    return "Tipo desconocido";
  }

  return requests.map((req) => {
    const statusRaw = req.humanResourceRequestStatus?.toLowerCase();
    const hasResponsible = !!req.userCodeInCharge;
    const isFinalized = ["closed", "rejected", "canceled"].includes(statusRaw);

    let status: Status;

    if (isFinalized) {
      status = "completed";
    } else if (hasResponsible) {
      status = "inProgress";
    } else {
      status = "pending";
    }

    return {
      id: req.humanResourceRequestNumber,
      title: getRequestTypeTitle(req.humanResourceRequestType),
      requestDate: formatDate(req.humanResourceRequestDate),
      responsible: req.userNameInCharge,
      hasResponsible,
      status,
    };
  });
};
