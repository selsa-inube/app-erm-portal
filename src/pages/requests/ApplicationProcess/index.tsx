import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { ApplicationProcessUI } from "./interface";
import { labels } from "@i18n/labels";

function ApplicationProcess() {
  const { id } = useParams();
  const isTablet = useMediaQuery("(max-width: 1100px)");

  const breadcrumbs = {
    label: labels.requests.breadcrumbs.applicationProcess,
    crumbs: [
      {
        path: "/",
        label: labels.requests.breadcrumbs.home,
        id: "/",
        isActive: false,
      },
      {
        path: "/requests",
        label: isTablet ? "..." : labels.requests.breadcrumbs.list,
        id: "/requests",
        isActive: false,
      },
    ],
    url: "/requests",
  };

  return (
    <ApplicationProcessUI
      appName={breadcrumbs.label}
      appRoute={[
        ...breadcrumbs.crumbs,
        {
          path: `/requests/application-process/${id}`,
          label: labels.requests.breadcrumbs.applicationProcess,
          id: `/requests/application-process/${id}`,
          isActive: true,
        },
      ]}
      navigatePage={breadcrumbs.url}
    />
  );
}

export { ApplicationProcess };
