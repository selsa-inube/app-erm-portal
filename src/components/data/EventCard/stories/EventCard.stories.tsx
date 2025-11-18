import { StoryFn, Meta } from "@storybook/react";
import {
  MdOutlineCake,
  MdOutlineEvent,
  MdOutlineWarningAmber,
} from "react-icons/md";

import { EventCard, EventCardProps } from "../";

const meta: Meta<typeof EventCard> = {
  component: EventCard,
  title: "components/data/EventCard",
  argTypes: {
    iconAppearance: {
      control: "select",
      options: ["success", "warning", "error", "info", "help", "dark", "gray"],
    },
  },
};

const Template: StoryFn<EventCardProps> = (args) => <EventCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  dateAndTime: "08/Nov/2025 - 08:00 a. m.",
  mainTitle: "Cumple 5 años en la compañía.",
  message: "Los quinquenios son importantes y se celebran con pastel :)",
  icon: <MdOutlineWarningAmber />,
  iconAppearance: "warning",
};

export const CustomIconAndSuccess = Template.bind({});
CustomIconAndSuccess.args = {
  dateAndTime: "25/Dic/2025 - Todo el día",
  mainTitle: "Vacaciones de fin de año aprobadas",
  message: "¡Prepárate para descansar y recargar energías!",
  icon: <MdOutlineCake />,
  iconAppearance: "success",
};

export const ErrorAppearance = Template.bind({});
ErrorAppearance.args = {
  dateAndTime: "10/Ene/2026 - 10:30 a. m.",
  mainTitle: "Reunión urgente de presupuesto",
  message: "Revisa la documentación adjunta antes de la reunión.",
  icon: <MdOutlineEvent />,
};

export default meta;
