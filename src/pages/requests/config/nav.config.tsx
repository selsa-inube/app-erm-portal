const breadcrumbs = {
  label: "Solicitudes en trámite",
  crumbs: [
    {
      path: "/",
      label: "Inicio",
      id: "/",
      isActive: false,
    },
    {
      path: "/requests",
      label: "Solicitudes en trámite",
      id: "/requests",
      isActive: true,
    },
  ],
  url: "/",
};
const RequestsNav: Record<string, { path: string }> = {
  Vinculación: { path: "/requests/application-process" },
};

export { breadcrumbs, RequestsNav };
