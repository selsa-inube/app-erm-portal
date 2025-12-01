import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { Logger } from "@utils/logger";

import { IHolidaysTable } from "../types";
import { HolidaysTable } from "..";

const holidaysData: IHolidaysTable[] = [
  {
    description: {
      value: "Disfrute de vacaciones",
    },
    date: { value: "18/Ene/2024" },
    days: { value: 2 },
    status: {
      value: "En trámite de aprobación",
    },
    details: {
      value: <MdOutlineVisibility />,
      type: "icon",
      onClick: () =>
        Logger.info("HolidaysTable | View details", {
          row: 0,
          description: "Disfrute de vacaciones",
        }),
    },
    delete: {
      value: <MdDeleteOutline />,
      type: "icon",
      onClick: () =>
        Logger.info("HolidaysTable | Delete", {
          row: 0,
          description: "Disfrute de vacaciones",
        }),
    },
    dataDetails: {
      value: {
        daysOff: "2",
        startDate: "18/Ene/2024",
        contract: "Contrato 123",
        description: "Disfrute de vacaciones",
      },
    },
  },
  {
    description: {
      value: "Pago de vacaciones",
    },
    date: { value: "18/Ene/2024" },
    days: { value: 7 },
    status: {
      value: "En trámite de validación",
    },
    details: {
      value: <MdOutlineVisibility />,
      type: "icon",
      onClick: () =>
        Logger.info("HolidaysTable | View details", {
          row: 1,
          description: "Pago de vacaciones",
        }),
    },
    delete: {
      value: <MdDeleteOutline />,
      type: "icon",
      onClick: () =>
        Logger.info("HolidaysTable | Delete", {
          row: 1,
          description: "Pago de vacaciones",
        }),
    },
    dataDetails: {
      value: {
        daysOff: "2",
        startDate: "18/Ene/2024",
        contract: "Contrato 123",
        description: "Disfrute de vacaciones",
      },
    },
  },
];

const meta: Meta<typeof HolidaysTable> = {
  title: "data/HolidaysTable",
  component: HolidaysTable,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof HolidaysTable> = (args) => (
  <HolidaysTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: holidaysData,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  data: holidaysData,
  loading: true,
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  loading: false,
};
