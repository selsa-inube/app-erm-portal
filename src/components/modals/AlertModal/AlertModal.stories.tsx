import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { AlertModal, IAlertModalProps } from "./index";

type Story = StoryObj<typeof AlertModal>;

const alertModal: Meta<typeof AlertModal> = {
  title: "Components/modals/AlertModal",
  component: AlertModal,

  decorators: [
    (Story) => {
      if (!document.getElementById("portal")) {
        const portalRoot = document.createElement("div");
        portalRoot.id = "portal";
        document.body.appendChild(portalRoot);
      }
      return <Story />;
    },
  ],

  argTypes: {
    handleClose: { action: "Modal cerrada" },
  },
};

export const Default: Story = (args: IAlertModalProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    args.handleClose?.();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir AlertModal</Button>

      {open && <AlertModal {...args} handleClose={handleClose} />}
    </>
  );
};

Default.args = {
  title: "Alertas del sistema",
  width: "450px",
  closeButtonText: "Cerrar",

  events: [
    {
      dateAndTime: "15 de noviembre 2024 - 10:45 AM",
      title: "Alerta 1",
      message: "Se detectaron tres alertas pendientes por revisar.",
    },
    {
      dateAndTime: "15 de noviembre 2024 - 11:00 AM",
      title: "Alerta 2",
      message: "Nueva notificación del sistema.",
    },
  ],
};

export default alertModal;
