import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { ApplicationProcessUI } from "./interface";

function ApplicationProcess() {
  const { id } = useParams();

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const breadcrumbs = {
    label: "Trámite de solicitud",
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/requests",
        label: isTablet ? "..." : "Solicitudes en trámite",
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
          label: "Trámite de solicitud",
          id: `/requests/application-process/${id}`,
          isActive: true,
        },
      ]}
      navigatePage={breadcrumbs.url}
    />
  );
}

export { ApplicationProcess };
