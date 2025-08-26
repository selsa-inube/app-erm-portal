import { IOption } from "@inubekit/inubekit";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";

export const assignmentOptions: IOption[] = Object.entries(ERequestType).map(
  ([key, label], index) => ({
    id: String(index + 1),
    label,
    value: key,
  }),
);

export const statusOptions: IOption[] = [
  { id: "pending", label: "Por evaluar", value: "pending" },
  {
    id: "supervisor_approval",
    label: "En progreso",
    value: "supervisor_approval",
  },
  { id: "completed", label: "Terminada", value: "completed" },
];
