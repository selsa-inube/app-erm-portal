import { labels } from "@i18n/labels";

import { IDaysUsedTable } from "./types";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "60px" } },
];

export const headers: {
  label: string;
  key: keyof IDaysUsedTable;
  action?: boolean;
  style?: React.CSSProperties;
}[] = [
  {
    label: labels.holidays.daysUsedTable.headers.startDate,
    key: "startDate",
    style: { width: "auto" },
  },
  {
    label: labels.holidays.daysUsedTable.headers.usageMode,
    key: "usageMode",
    style: { width: "auto" },
  },
  {
    label: labels.holidays.daysUsedTable.headers.days,
    key: "days",
    style: { width: "auto" },
  },
];

export const pageLength = 10;

export const caption = labels.holidays.daysUsedTable.caption;
