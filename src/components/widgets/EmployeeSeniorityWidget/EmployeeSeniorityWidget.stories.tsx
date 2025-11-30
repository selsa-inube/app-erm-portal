import { Meta, StoryFn } from "@storybook/react";
import { EmployeeSeniorityWidget, EmployeeSeniorityWidgetProps } from ".";

const meta: Meta<typeof EmployeeSeniorityWidget> = {
  title: "components/cards/EmployeeSeniorityWidget",
  component: EmployeeSeniorityWidget,
};

const Template: StoryFn<EmployeeSeniorityWidgetProps> = (args) => (
  <EmployeeSeniorityWidget {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: 0.5,
  unit: "Años",
  label: "Antigüedad",
};

export default meta;
