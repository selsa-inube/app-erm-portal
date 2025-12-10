import { labels } from "@i18n/labels";

const breadcrumbs = {
  id: 1,
  label: labels.certifications.titles.certifications,
  crumbs: [
    {
      path: "/",
      label: labels.certifications.titles.home,
      id: "/",
      isActive: false,
    },
    {
      path: "/certifications",
      label: labels.certifications.titles.certifications,
      id: "/certifications",
      isActive: true,
    },
  ],
  url: "/",
};

export { breadcrumbs };
