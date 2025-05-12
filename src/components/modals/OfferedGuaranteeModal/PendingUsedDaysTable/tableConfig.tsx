import { IPendingUsedDaysTableHeader } from "./types";

export const contractTableHeaders: IPendingUsedDaysTableHeader[] = [
  { label: "Contrato", key: "contract", style: { width: "auto" } },
  { label: "Días pendientes", key: "pendingDays", style: { width: "auto" } },
];

export const paymentTableHeaders: IPendingUsedDaysTableHeader[] = [
  {
    label: "Fecha de inicio o pago",
    key: "startDate",
    style: { width: "auto" },
  },
  { label: "Modalidad de uso", key: "usageMode", style: { width: "auto" } },
  { label: "Días", key: "days", style: { width: "auto" } },
];

export const contractTableColumns = [
  { span: 1, style: { width: "65%" } },
  { span: 1, style: { width: "30%" } },
];

export const paymentTableColumns = [
  { span: 1, style: { width: "50%" } },
  { span: 1, style: { width: "40%" } },
  { span: 1, style: { width: "20%" } },
];

export const pageLength = 5;
