import { HumanResourceRequest } from "@ptypes/humanResourcesRequest.types";
import { getRequestTypeLabel } from "./enum";

type Status = "pending" | "inProgress" | "completed";

const normalizeStatus = (status: string): Status => {
  switch (status.toLowerCase()) {
    case "por evaluar":
    case "pending":
      return "pending";

    case "en progreso":
    case "in progress":
    case "inprogress":
      return "inProgress";

    case "terminada":
    case "completed":
    case "finished":
    case "closed":
      return "completed";

    case "rejected":
    case "canceled":
      return "pending";

    default:
      return "pending";
  }
};

export const formatHumanResourceRequests = (
  requests: HumanResourceRequest[],
) => {
  return requests.map((req) => ({
    id: req.humanResourceRequestNumber,
    title: getRequestTypeLabel(req.humanResourceRequestType),
    requestDate: req.humanResourceRequestDate,
    responsible: req.userNameInCharge,
    hasResponsible: !!req.userNameInCharge,
    status: normalizeStatus(req.humanResourceRequestStatus),
  }));
};
