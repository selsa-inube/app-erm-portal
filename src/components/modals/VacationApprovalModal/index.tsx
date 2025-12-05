import {
  Icon,
  Text,
  Stack,
  Divider,
  Button,
  Blanket,
  useMediaQuery,
} from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdClear, MdCheckCircle } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

import { spacing } from "@design/tokens/spacing";
import { labels } from "@i18n/labels";

import { StyledModal, StyledContainerClose } from "./styles";

export interface VacationApprovalModalProps {
  isApproved?: boolean;
  portalId?: string;
  onCloseModal?: () => void;
}

export function VacationApprovalModal(props: VacationApprovalModalProps) {
  const { isApproved = true, portalId = "portal", onCloseModal } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const portalNode = document.getElementById(portalId);

  if (!portalNode) {
    throw new Error(
      "The portal node is not defined. Ensure the specific node exists in the DOM.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack direction="column" gap={spacing.s200}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="headline" size="small">
              {labels.modal.vacationApproval.title}
            </Text>
            <StyledContainerClose onClick={onCloseModal}>
              <Stack alignItems="center" gap={spacing.s100}>
                <Text>{labels.modal.generic.close}</Text>
                <Icon
                  icon={<MdClear />}
                  size="24px"
                  cursorHover
                  appearance="dark"
                />
              </Stack>
            </StyledContainerClose>
          </Stack>
          <Divider />
        </Stack>
        <Stack direction="column" alignItems="center" gap={spacing.s200}>
          <Icon
            icon={isApproved ? <MdCheckCircle /> : <IoMdCloseCircle />}
            size="68px"
            appearance={isApproved ? "success" : "gray"}
          />
          <Text weight="bold">
            <b>
              {isApproved
                ? labels.modal.vacationApproval.approved
                : labels.modal.vacationApproval.rejected}
            </b>
          </Text>
        </Stack>
        <Stack justifyContent="end">
          <Button onClick={onCloseModal}>Entendido</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
