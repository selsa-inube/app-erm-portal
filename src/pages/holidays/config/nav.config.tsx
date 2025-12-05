import { labels } from "@i18n/labels";

export const breadcrumbs = {
  label: labels.holidays.breadcrumbs.holidays,
  crumbs: [
    {
      path: "/",
      label: labels.holidays.breadcrumbs.home,
      id: "/",
      isActive: false,
    },
    {
      path: "/holidays",
      label: labels.holidays.breadcrumbs.holidays,
      id: "/holidays",
      isActive: true,
    },
  ],
  url: "/",
};
