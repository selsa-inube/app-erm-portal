import { MdWarningAmber } from "react-icons/md";
import { labels } from "@i18n/labels";

export const alerts = labels.certifications.alerts.map((alert) => ({
  ...alert,
  icon: <MdWarningAmber />,
}));
