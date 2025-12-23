import { labels } from "@i18n/labels";

import { ICertificationsTable, CertificationsTableField } from "./types";

export const columns = [
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "auto" } },
  { span: 1, style: { width: "70px" } },
  { span: 1, style: { width: "80px" } },
];

interface ExtendedIHolidaysTable extends ICertificationsTable {
  mobileActions?: CertificationsTableField<JSX.Element>;
  type: CertificationsTableField<string>;
}

export const headers: {
  label: string;
  key: keyof ExtendedIHolidaysTable;
  action?: boolean;
  style?: React.CSSProperties;
}[] = [
  {
    label: labels.certifications.tableHeaders.requestNumber,
    key: "requestNumber",
    style: { width: "auto" },
  },
  {
    label: labels.certifications.tableHeaders.type,
    key: "type",
    style: { width: "auto" },
  },
  {
    label: labels.certifications.tableHeaders.date,
    key: "date",
    style: { width: "auto" },
  },
  {
    label: labels.certifications.tableHeaders.status,
    key: "status",
    style: { width: "auto" },
  },
  {
    label: labels.certifications.tableHeaders.details,
    key: "details",
    action: true,
    style: { width: "60px" },
  },
  {
    label: labels.certifications.tableHeaders.delete,
    key: "delete",
    action: true,
    style: { width: "60px" },
  },
];

export const pageLength = 10;
