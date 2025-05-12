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
import { spacing } from "@design/tokens/spacing";

import { StyledContainer, StyledContainerClose } from "./styles";
import { dataBaseModal } from "./config";

export interface IBaseModalProps {
  handleNext: () => void;
  title: string;
  nextButton: string;
  children: JSX.Element | JSX.Element[];
  handleBack?: () => void;
  handleClose?: () => void;
  width?: string;
  height?: string;
  disabledNext?: boolean;
  disabledBack?: boolean;
  iconBeforeNext?: React.JSX.Element;
  iconAfterNext?: React.JSX.Element;
  backButton?: string;
  initialDivider?: boolean;
  finalDivider?: boolean;
  portalId?: string;
}

export function BaseModal(props: IBaseModalProps) {
  const {
    handleNext,
    title,
    nextButton,
    children,
    handleBack,
    handleClose,
    width = "450px",
    height = "",
    disabledNext = false,
    disabledBack = false,
    iconBeforeNext,
    iconAfterNext,
    backButton = "",
    initialDivider = true,
    finalDivider = false,
    portalId = "portal",
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  const isMobile = useMediaQuery("(max-width: 750px)");

  return createPortal(
    <Blanket>
      <StyledContainer $smallScreen={isMobile}>
        <Stack
          direction="column"
          padding={isMobile ? spacing.s200 : spacing.s300}
          gap={isMobile ? spacing.s200 : spacing.s300}
          width={isMobile ? "90%" : width}
          height={isMobile ? "auto" : height}
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text size={isMobile ? "medium" : "small"} type="headline">
              {title}
            </Text>
            <StyledContainerClose onClick={handleClose ?? handleBack}>
              <Stack alignItems="center" gap={spacing.s100}>
                <Text type="body" size={isMobile ? "medium" : "large"}>
                  {dataBaseModal.close}
                </Text>
                <Icon
                  icon={<MdClear />}
                  size={spacing.s300}
                  cursorHover
                  appearance="dark"
                />
              </Stack>
            </StyledContainerClose>
          </Stack>
          {initialDivider && <Divider />}
          <Stack direction="column">{children}</Stack>
          {finalDivider && <Divider />}
          <Stack justifyContent="end" gap={spacing.s250}>
            {backButton && (
              <Button
                onClick={handleBack ?? handleClose}
                disabled={disabledBack}
                variant="outlined"
                appearance="gray"
              >
                {backButton}
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={disabledNext}
              iconAfter={iconAfterNext}
              iconBefore={iconBeforeNext}
            >
              {nextButton}
            </Button>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node,
  );
}
