import { BrowserRouter } from "react-router-dom";
import { StoryFn, Meta } from "@storybook/react";
import { MdEditCalendar } from "react-icons/md";

import { WidgetBanner, WidgetBannerProps } from ".";

const meta: Meta<typeof WidgetBanner> = {
  component: WidgetBanner,
  title: "components/cards/WidgetBanner",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<WidgetBannerProps> = (args) => (
  <WidgetBanner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  icon: <MdEditCalendar />,
  value: 10,
  label: "Días pendientes",
  onClick: () => alert("Banner clickeado"),
};

export const WithCustomTitle = Template.bind({});
WithCustomTitle.args = {
  ...Default.args,
  value: 10,
  label: "Ver los correos más recientes",
};

export default meta;
