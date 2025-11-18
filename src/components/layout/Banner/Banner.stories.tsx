import { Meta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { MdOutlineBarChart } from "react-icons/md";

import { VinculationBanner, VinculationBannerProps } from "./index";

const meta: Meta<typeof VinculationBanner> = {
  title: "components/VinculationBanner",
  component: VinculationBanner,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    status: {
      control: "select",
      options: [
        "Prospecto",
        "En proceso de vinculación",
        "En proceso de retiro",
        "Retirado",
        "Activo",
      ],
    },
  },
};

export const Default = (args: VinculationBannerProps) => (
  <VinculationBanner {...args} />
);

Default.args = {
  name: "José Manuel Hernández Díaz",
  status: "Activo",
  imageUrl: "url/dummy",
  redirectUrl: "/somewhere",
  infoItems: [
    {
      icon: <MdOutlineBarChart />,
      value: 1250000,
      label: "Monto ahorrado",
    },
    {
      icon: <MdOutlineBarChart />,
      value: 5,
      label: "Certificados",
    },
    {
      icon: <MdOutlineBarChart />,
      value: 2,
      label: "Créditos",
    },
  ],
};

export default meta;
