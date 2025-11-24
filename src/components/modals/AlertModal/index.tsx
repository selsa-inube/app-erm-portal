import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Blanket,
  Button,
  Divider,
  Stack,
  Icon,
  Text,
  useMediaQuery,
} from "@inubekit/inubekit";

import { validationMessages } from "@validations/validationMessages";
import { EventCard } from "@components/data/EventCard";
import { spacing } from "@design/tokens/spacing";

import { IEventItem } from "./types";
import {
  StyledAlertContainer,
  StyledCloseButton,
  StyledContentScrollable,
} from "./styles";

export interface AlertModalProps {
  width?: string;
  portalId?: string;
  closeButtonText?: string;
  title: string;
  events: IEventItem[];
  handleClose: () => void;
}

export function AlertModal(props: AlertModalProps) {
  const {
    handleClose,
    title,
    events,
    width = "450px",
    portalId = "portal",
    closeButtonText = "Cerrar",
  } = props;

  const node = document.getElementById(portalId);
  if (!node) throw new Error(validationMessages.errorNodo);

  const isMobile = useMediaQuery("(max-width: 750px)");

  return createPortal(
    <Blanket>
      <StyledAlertContainer $smallScreen={isMobile} width={width}>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          padding={spacing.s100}
        >
          <Text type="title">{title}</Text>

          <StyledCloseButton onClick={handleClose}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledCloseButton>
        </Stack>

        <Stack padding={spacing.s100}>
          <Divider />
        </Stack>

        <StyledContentScrollable>
          <Stack direction="column" padding={spacing.s100} gap={spacing.s300}>
            {events.map((ev, index) => (
              <EventCard
                key={index}
                dateAndTime={ev.dateAndTime}
                mainTitle={ev.title}
                message={ev.message}
              />
            ))}
          </Stack>
        </StyledContentScrollable>
        <Stack justifyContent="end">
          <Button onClick={handleClose} variant="filled" appearance="primary">
            {closeButtonText}
          </Button>
        </Stack>
      </StyledAlertContainer>
    </Blanket>,
    node,
  );
}
