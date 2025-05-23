import {
  MdLogout,
  MdOutlinePersonOff,
  MdOutlineFilePresent,
  MdOutlineBeachAccess,
  MdOutlinePersonalInjury,
  MdOutlineHistoryEdu,
  MdOutlineBadge,
  MdPendingActions,
} from "react-icons/md";
import { ILinkNav } from "@inubekit/inubekit";
import { useLocation } from "react-router-dom";
import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";

const baseNavLinks = [
  {
    id: "vacacionesPortalErm",
    label: "Vacaciones",
    icon: <MdOutlineBeachAccess />,
    path: "/holidays",
    description:
      "Son los días de descanso remunerado que le corresponden al empleado por cada año trabajado.",
  },
  {
    id: "incapacidadesPortalErm",
    label: "Incapacidades",
    icon: <MdOutlinePersonalInjury />,
    path: "/disability",
    description:
      "Son períodos en los que el trabajador no puede laborar debido a una enfermedad o accidente, y está respaldado por un certificado médico.",
  },
  {
    id: "ausenciasPortalErm",
    label: "Ausencias",
    icon: <MdOutlinePersonOff />,
    path: "/absences",
    description:
      "Son períodos en los que el trabajador no se presenta a laborar, ya sea de forma justificada o injustificada.",
  },
  {
    id: "certificacionPortalErm",
    label: "Certificaciones",
    icon: <MdOutlineFilePresent />,
    path: "/certifications",
    description:
      "Son documentos que acreditan la formación o experiencia laboral de un empleado.",
  },
  {
    id: "contratoPortalErm",
    label: "Contratos",
    icon: <MdOutlineHistoryEdu />,
    path: "/contracts",
    description:
      "Son acuerdos legales entre el empleador y el empleado que establecen los términos de trabajo.",
  },
  {
    id: "cargoPortalErm",
    label: "Cargos",
    icon: <MdOutlineBadge />,
    path: "/charges",
    description:
      "Se refiere a las posiciones o roles que ocupan los empleados dentro de la estructura organizacional de la empresa.",
  },
  {
    id: "solTramitePortalErm",
    label: "Solicitudes en tramite",
    icon: <MdPendingActions />,
    path: "/requests",
    description:
      "Son trámites o gestiones que están en proceso de ser aprobadas o completadas.",
  },
];

const noop = () => undefined;

const actions = [
  {
    id: "logout",
    label: "Cerrar sesión",
    icon: <MdLogout />,
    action: () => {
      window.location.href = "/logout";
    },
  },
];

const useNavConfig = (optionForCustomerPortal: IOptionWithSubOptions[]) => {
  const location = useLocation();
  const baseNav = navConfig(optionForCustomerPortal);
  const nav = {
    reactPortalId: "portals",
    title: "MENU",
    sections: {
      administrate: {
        name: "",
        links: baseNav.reduce(
          (acc, link) => {
            acc[link.id] = {
              ...link,
              isActive: location.pathname.startsWith(link.path),
            };
            return acc;
          },
          {} as Record<string, ILinkNav>,
        ),
      },
    },
    actions,
  };

  return nav;
};

const navConfig = (optionForCustomerPortal: IOptionWithSubOptions[]) => {
  return baseNavLinks.map((link) => {
    const option = optionForCustomerPortal.find(
      (option) => option.publicCode === link.id,
    );
    return {
      ...link,
      label: option?.abbreviatedName ?? link.label,
      isEnabled: !!option,
    };
  });
};

const useConfigHeader = (optionForCustomerPortal: IOptionWithSubOptions[]) => {
  const nav = {
    reactPortalId: "portal",
    title: "MENU",
    sections: [
      {
        isOpen: true,
        onClose: noop,
        onToggle: noop,
        subtitle: "Administrate",
        links: navConfig(optionForCustomerPortal),
      },
    ],
    actions,
  };

  return nav;
};

const userMenu = [
  {
    id: "section",
    title: "",
    links: [
      {
        id: "logout",
        title: "Cerrar sesión",
        path: "/logout",
        iconBefore: <MdLogout />,
      },
    ],
    divider: true,
  },
];

export {
  useNavConfig,
  useConfigHeader,
  baseNavLinks,
  userMenu,
  actions,
  navConfig,
};
