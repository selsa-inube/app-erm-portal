import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { VacationApprovalModal, VacationApprovalModalProps } from "..";
import { props } from "./props";

const story: Meta<typeof VacationApprovalModal> = {
  component: VacationApprovalModal,
  title: "components/modals/VacationApprovalModal",
  argTypes: props,
};

const DefaultTemplate: StoryFn<VacationApprovalModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && (
        <VacationApprovalModal {...args} onCloseModal={handleShowModal} />
      )}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  isApproved: true,
};

export default story;
