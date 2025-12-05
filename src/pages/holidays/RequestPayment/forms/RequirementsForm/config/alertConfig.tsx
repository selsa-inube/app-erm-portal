import { MdWarningAmber } from "react-icons/md";

import { labels } from "@i18n/labels";

export const alerts = [
  {
    title: labels.holidays.alerts.first.title,
    requirement: labels.holidays.alerts.first.requirement,
    cause: labels.holidays.alerts.first.cause,
    icon: <MdWarningAmber />,
  },
  {
    title: labels.holidays.alerts.second.title,
    requirement: labels.holidays.alerts.second.requirement,
    cause: labels.holidays.alerts.second.cause,
    icon: <MdWarningAmber />,
  },
];
