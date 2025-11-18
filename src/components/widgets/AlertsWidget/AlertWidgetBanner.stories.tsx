import { BrowserRouter } from "react-router-dom";
import { StoryFn, Meta } from "@storybook/react";
import { MdOutlineNotificationImportant } from "react-icons/md";

import { AlertWidgetBanner, AlertWidgetBannerProps } from ".";

const meta: Meta<typeof AlertWidgetBanner> = {
  component: AlertWidgetBanner,
  title: "components/cards/AlertWidgetBanner",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<AlertWidgetBannerProps> = (args) => (
  <AlertWidgetBanner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  icon: <MdOutlineNotificationImportant />,
  value: 10,
  onClick: () => alert("Banner clickeado"),
};

export default meta;
