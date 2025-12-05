import { MdAdd } from "react-icons/md";

import { labels } from "@i18n/labels";

import { IAction } from "./type";

export const Actions = (
  disableEnjoyment?: boolean,
  onRequestEnjoyment?: () => void,
): IAction[] => {
  return [
    {
      id: "enjoyment",
      icon: <MdAdd />,
      appearance: "primary",
      label: labels.certifications.titles.addRequestPage,
      onClick: onRequestEnjoyment,
      isDisabled: disableEnjoyment ?? false,
    },
  ];
};
