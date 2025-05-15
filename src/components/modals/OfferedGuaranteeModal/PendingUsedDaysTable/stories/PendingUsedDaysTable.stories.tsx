import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { IPendingUsedDaysTable } from "../types";
import { PendingUsedDaysTable } from "..";

const meta: Meta<typeof PendingUsedDaysTable> = {
  title: "data/PendingUsedDaysTable",
  component: PendingUsedDaysTable,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof PendingUsedDaysTable> = (args) => (
  <PendingUsedDaysTable {...args} />
);

const contractData: IPendingUsedDaysTable[] = [
  {
    contract: { value: "Contrato 001" },
    pendingDays: { value: 5 },
  },
  {
    contract: { value: "Contrato 002" },
    pendingDays: { value: 12 },
  },
];

const paymentData: IPendingUsedDaysTable[] = [
  {
    startDate: { value: "01/04/2024" },
    usageMode: { value: "Presencial" },
    days: { value: 3 },
  },
  {
    startDate: { value: "10/04/2024" },
    usageMode: { value: "Remoto" },
    days: { value: 2 },
  },
];

export const ContractTable = Template.bind({});
ContractTable.args = {
  data: contractData,
  loading: false,
  variant: "contract",
};

export const PaymentTable = Template.bind({});
PaymentTable.args = {
  data: paymentData,
  loading: false,
  variant: "payment",
};

export const Loading = Template.bind({});
Loading.args = {
  data: contractData,
  loading: true,
  variant: "contract",
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  loading: false,
  variant: "payment",
};
