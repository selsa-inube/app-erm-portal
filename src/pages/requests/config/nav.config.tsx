import { labels } from "@i18n/labels";

const breadcrumbs = {
  label: labels.requests.breadcrumbs.list,
  crumbs: [
    {
      path: "/",
      label: labels.requests.breadcrumbs.home,
      id: "/",
      isActive: false,
    },
    {
      path: "/requests",
      label: labels.requests.breadcrumbs.list,
      id: "/requests",
      isActive: true,
    },
  ],
  url: "/",
};

const RequestsNav: Record<string, { path: string }> = {
  [labels.requests.navigation.vinculation]: {
    path: "/requests/application-process",
  },
};

export { breadcrumbs, RequestsNav };
