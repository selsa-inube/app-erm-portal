import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Icon,
  Stack,
  Text,
  useMediaQuery,
  Blanket,
  Divider,
  Button,
} from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";

import { StyledModal, StyledContainerClose } from "./styles";

export interface TakeRequestModalProps {
  requestId: string;
  portalId?: string;
  handleVisualize?: () => void;
  handleTakeRequest?: () => void;
  onCloseModal?: () => void;
}

export function TakeRequestModal(props: TakeRequestModalProps) {
  const {
    requestId = "XXXXXX",
    portalId = "portal",
    handleVisualize,
    handleTakeRequest,
    onCloseModal,
  } = props;

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
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {labels.requests.takeRequestModal.title}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>{labels.requests.takeRequestModal.close}</Text>
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
        <Text>
          {labels.requests.takeRequestModal.description.beforeRequestId}
          <Text as="span" weight="bold">
            {labels.requests.takeRequestModal.description.requestNumberPrefix}
            {requestId}
          </Text>
          {labels.requests.takeRequestModal.description.afterRequestId}
        </Text>
        <Stack justifyContent="flex-end" gap={spacing.s250}>
          <Button
            onClick={handleVisualize}
            appearance="gray"
            variant="outlined"
            cursorHover
          >
            {labels.requests.takeRequestModal.actions.visualize}
          </Button>
          <Button onClick={handleTakeRequest} cursorHover>
            {labels.requests.takeRequestModal.actions.takeRequest}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
