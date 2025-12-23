import { ReactNode } from "react";

import * as MdIcons from "react-icons/md";
import { IconType } from "react-icons";
import { MdLogout } from "react-icons/md";
import { ILinkNav } from "@inubekit/inubekit";
import { useLocation } from "react-router-dom";
import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";
import { labels } from "@i18n/labels";

const baseNavLinks = [
  {
    id: "vacacionesPortalErm",
    label: labels.config.nav.holidays.label,
    path: "/holidays",
    description: labels.config.nav.holidays.description,
    order: 1,
  },
  {
    id: "certificacionPortalErm",
    label: labels.config.nav.certifications.label,
    path: "/certifications",
    description: labels.config.nav.certifications.description,
    order: 2,
  },
  {
    id: "contratoPortalErm",
    label: labels.config.nav.contracts.label,
    path: "/contracts",
    description: labels.config.nav.contracts.description,
    order: 3,
  },
  {
    id: "cargoPortalErm",
    label: labels.config.nav.charges.label,
    path: "/charges",
    description: labels.config.nav.charges.description,
    order: 4,
  },
  {
    id: "solTramitePortalErm",
    label: labels.config.nav.requests.label,
    path: "/requests",
    description: labels.config.nav.requests.description,
    order: 5,
  },
];

const noop = () => undefined;

const actions = [
  {
    id: "logout",
    label: labels.config.nav.logout.label,
    icon: <MdLogout />,
    action: () => {
      window.location.href = "/logout";
    },
  },
];

const getIcon = (iconReference?: string): ReactNode => {
  if (iconReference && iconReference.trim() !== "") {
    const IconComponent: IconType | undefined = (
      MdIcons as Record<string, IconType>
    )[iconReference];
    if (IconComponent) {
      return <IconComponent size={24} />;
    }
  }
  return <div style={{ width: 24, height: 24 }} />;
};

const navConfig = (optionForCustomerPortal: IOptionWithSubOptions[]) => {
  return baseNavLinks
    .sort((a, b) => a.order - b.order)
    .map((link) => {
      const option = optionForCustomerPortal.find(
        (option) => option.publicCode === link.id,
      );

      return {
        ...link,
        label: option?.abbreviatedName ?? link.label,
        icon: getIcon(option?.iconReference),
        isEnabled: !!option,
      };
    });
};

const useNavConfig = (optionForCustomerPortal: IOptionWithSubOptions[]) => {
  const location = useLocation();
  const baseNav = navConfig(optionForCustomerPortal);

  const nav = {
    reactPortalId: "portals",
    title: labels.config.nav.title,
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

const useConfigHeader = (optionForCustomerPortal: IOptionWithSubOptions[]) => {
  const nav = {
    reactPortalId: "portal",
    title: labels.config.nav.title,
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
        title: labels.config.nav.logout.label,
        path: "/logout",
        iconBefore: <MdLogout />,
      },
    ],
    divider: true,
  },
];

export {
  useNavConfig,
  getIcon,
  useConfigHeader,
  baseNavLinks,
  userMenu,
  actions,
  navConfig,
};
