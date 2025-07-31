import { ArgTypes } from "@storybook/react";

import { VacationApprovalModalProps } from "..";

const props: Partial<ArgTypes<VacationApprovalModalProps>> = {
  isApproved: {
    control: "boolean",
    description: "Determines if the vacation request was approved or rejected",
    defaultValue: true,
  },
  portalId: {
    control: "text",
    description: "ID of the portal node for rendering the modal",
    defaultValue: "portal",
  },
  onCloseModal: {
    action: "closed",
    description: "Function triggered when the modal is closed",
  },
};

export { props };
