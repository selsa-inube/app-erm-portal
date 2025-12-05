import {
  MdAdd,
  MdOutlineCancel,
  MdUpdate,
  MdOutlineEdit,
} from "react-icons/md";

import { labels } from "@i18n/labels";
import { IAction } from "./type";

export const Actions = (
  onClickAdd?: () => void,
  onClickModify?: () => void,
  onClickRenew?: () => void,
  onClickEliminate?: () => void,
): IAction[] => {
  return [
    {
      icon: <MdAdd />,
      appearance: "primary",
      label: labels.contracts.actions.add,
      onClick: onClickAdd,
      isDisabled: true,
    },
    {
      icon: <MdOutlineEdit />,
      appearance: "primary",
      label: labels.contracts.actions.modify,
      onClick: onClickModify,
      isDisabled: true,
    },
    {
      icon: <MdUpdate />,
      appearance: "primary",
      label: labels.contracts.actions.renew,
      onClick: onClickRenew,
      isDisabled: true,
    },
    {
      icon: <MdOutlineCancel />,
      appearance: "danger",
      label: labels.contracts.actions.terminate,
      onClick: onClickEliminate,
      isDisabled: true,
    },
  ];
};
