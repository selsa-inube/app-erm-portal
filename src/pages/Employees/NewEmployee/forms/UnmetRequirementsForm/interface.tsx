import {
  Stack,
  Button,
  Grid,
  useMediaQuery,
  Text,
  Icon,
} from "@inubekit/inubekit";
import { MdOutlineCheckCircle } from "react-icons/md";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";
import { AlertCard, AlertCardProps } from "@components/data/AlertCard";

import { StyledContainer } from "./styles";

interface UnmetRequirementsFormUIProps {
  alertCards?: AlertCardProps[];
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function UnmetRequirementsFormUI(props: UnmetRequirementsFormUIProps) {
  const { alertCards, withNextButton, handleNextStep, handlePreviousStep } =
    props;

  const isMobile = useMediaQuery("(max-width: 760px)");
  const isEmptyAlertCards = !alertCards || alertCards.length === 0;

  const { unmetRequirementsForm } = labels.employee;

  return (
    <form>
      <Stack
        direction="column"
        gap={isMobile ? spacing.s300 : spacing.s400}
        height="60vh"
        justifyContent="space-between"
      >
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s250}>
            {isEmptyAlertCards ? (
              <Stack
                direction="column"
                alignItems="center"
                gap={spacing.s250}
                padding={spacing.s250}
              >
                <Icon
                  icon={<MdOutlineCheckCircle />}
                  appearance="success"
                  size="54px"
                  spacing="narrow"
                />
                <Text type="title" size="medium" textAlign="center">
                  {unmetRequirementsForm.emptyState.message}
                </Text>
              </Stack>
            ) : (
              <Grid
                templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
                gap={spacing.s200}
                autoRows="unset"
              >
                {alertCards.map((item, index) => (
                  <AlertCard
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    iconAppearance={item.iconAppearance}
                    requirement={item.requirement}
                    cause={item.cause}
                  />
                ))}
              </Grid>
            )}
          </Stack>
        </StyledContainer>

        {withNextButton && (
          <Stack justifyContent="flex-end" gap={spacing.s250}>
            <Button
              onClick={handlePreviousStep}
              appearance="gray"
              variant="outlined"
            >
              {unmetRequirementsForm.actions.previous}
            </Button>
            <Button onClick={handleNextStep}>
              {unmetRequirementsForm.actions.next}
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { UnmetRequirementsFormUI };
