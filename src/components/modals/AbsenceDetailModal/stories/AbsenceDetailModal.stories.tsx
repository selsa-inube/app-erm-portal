import { Meta, StoryObj } from "@storybook/react";

import { Logger } from "@utils/logger";

import { AbsenceDetailModal } from "../index";
import { AbsenceDetailItem } from "../types";

interface AbsenceDetailModalStoryProps {
  title: string;
  buttonLabel?: string;
  portalId?: string;
  details: AbsenceDetailItem[];
  onClose: () => void;
}

const meta: Meta<typeof AbsenceDetailModal> = {
  title: "components/modals/AbsenceDetailModal",
  component: AbsenceDetailModal,
  argTypes: {
    title: { control: "text" },
    buttonLabel: { control: "text" },
    portalId: { control: "text" },
  },
};

type Story = StoryObj<typeof AbsenceDetailModal>;
export default meta;

const getModalContent = (): AbsenceDetailItem[] => [
  { label: "Motivo", value: "Incapacidad por enfermedad general" },
  { label: "Fecha", value: "15/Nov/2024" },
  { label: "Duración", value: "3 días" },
  { label: "Tipo", value: "No remunerada" },
  {
    label: "Observaciones",
    value:
      "La incapacidad fue otorgada por la EPS debido a un cuadro viral. Se envió la documentación correspondiente al área de RRHH.",
  },
];

export const Default: Story = (args: AbsenceDetailModalStoryProps) => {
  const modalContent = getModalContent();

  return <AbsenceDetailModal {...args} details={modalContent} />;
};

Default.args = {
  title: "Detalle de ausencia",
  buttonLabel: "Cerrar",
  portalId: "portal",
  details: [],
  onClose: () => {
    Logger.debug("AbsenceDetailModal closed (storybook)");
  },
};
