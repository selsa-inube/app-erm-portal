import {
  Blanket,
  Button,
  Divider,
  Icon,
  Stack,
  Text,
  useMediaQuery,
} from "@inubekit/inubekit";
import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";

import { spacing } from "@design/tokens/spacing";

import {
  StyledModal,
  StyledContainerTitle,
  StyledContainerClose,
  StyledContainerContent,
  StyledBoxAttribute,
  StyledGridContainer,
} from "./styles";

import { AbsenceDetailItem } from "./types";

interface AbsenceDetailModalProps {
  title: string;
  buttonLabel?: string;
  details: AbsenceDetailItem[];
  portalId?: string;
  onClose: () => void;
  isLoading?: boolean;
}

function AbsenceDetailModal(props: AbsenceDetailModalProps) {
  const {
    title,
    details,
    onClose,
    buttonLabel = "Cerrar",
    portalId = "portal",
  } = props;

  const node = document.getElementById(portalId);
  if (!node) return null;

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <StyledContainerTitle>
          <Text type="headline" size="small">
            {title}
          </Text>

          <StyledContainerClose onClick={onClose}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                appearance="dark"
                cursorHover
              />
            </Stack>
          </StyledContainerClose>
        </StyledContainerTitle>

        <Divider />

        <StyledContainerContent>
          <StyledGridContainer $smallScreen={isMobile}>
            {details.map((item, index) => {
              const text = item.value || "";
              const maxCharsPerLine = isMobile ? 35 : 50;
              const isLongContent = text.length > maxCharsPerLine;

              const forceFullWidth = item.label === "Detalles del motivo";

              return (
                <StyledBoxAttribute
                  key={index}
                  $smallScreen={isMobile}
                  $isLongContent={isLongContent || forceFullWidth}
                >
                  <Stack direction="column" gap={spacing.s050}>
                    <Text type="label" size="medium" weight="bold">
                      {item.label}:
                    </Text>

                    <Text type="body" size="medium" appearance="gray">
                      {text}
                    </Text>
                  </Stack>
                </StyledBoxAttribute>
              );
            })}
          </StyledGridContainer>
        </StyledContainerContent>

        <Stack justifyContent="flex-end" gap={spacing.s100}>
          <Button onClick={onClose}>{buttonLabel}</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node,
  );
}

export { AbsenceDetailModal };
