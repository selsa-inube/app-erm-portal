import { BrowserRouter } from "react-router-dom";
import { StoryFn, Meta } from "@storybook/react";
import { MdOutlinePersonOff } from "react-icons/md";

import { AbsenceWidgetBanner, AbsenceWidgetBannerProps } from ".";

const meta: Meta<typeof AbsenceWidgetBanner> = {
  component: AbsenceWidgetBanner,
  title: "components/cards/AbsenceWidgetBanner",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<AbsenceWidgetBannerProps> = (args) => (
  <AbsenceWidgetBanner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  icon: <MdOutlinePersonOff />,
  label: "Ausencia actual",
  value: "27/Oct - 02/Nov",
  isLoading: false,
  onClick: () => alert("Banner de ausencia clickeado"),
};

export const Loading = Template.bind({});
Loading.args = {
  icon: <MdOutlinePersonOff />,
  label: "Cargando ausencia...",
  value: "",
  isLoading: true,
};

export default meta;
