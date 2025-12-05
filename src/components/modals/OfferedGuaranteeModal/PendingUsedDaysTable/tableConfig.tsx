import { labels } from "@i18n/labels";

import { IPendingUsedDaysTableHeader } from "./types";

export const contractTableHeaders: IPendingUsedDaysTableHeader[] = [
  {
    label: labels.modal.daysUsed.tableHeaders.contract,
    key: "contract",
    style: { width: "auto" },
  },
  {
    label: labels.modal.daysUsed.tableHeaders.pendingDays,
    key: "pendingDays",
    style: { width: "auto" },
  },
];

export const paymentTableHeaders: IPendingUsedDaysTableHeader[] = [
  {
    label: labels.modal.daysUsed.tableHeaders.startDate,
    key: "startDate",
    style: { width: "auto" },
  },
  {
    label: labels.modal.daysUsed.tableHeaders.usageMode,
    key: "usageMode",
    style: { width: "auto" },
  },
  {
    label: labels.modal.daysUsed.tableHeaders.days,
    key: "days",
    style: { width: "auto" },
  },
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

export const pageLength = 10;
