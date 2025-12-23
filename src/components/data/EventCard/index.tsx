import { Stack, Text, Icon, IIconAppearance } from "@inubekit/inubekit";
import { MdOutlineWarningAmber } from "react-icons/md";

import { spacing } from "@design/tokens/spacing";
import { labels } from "@i18n/labels";

import { StyledEventCard } from "./styles";

interface EventCardProps {
  dateAndTime: string;
  mainTitle: string;
  message: string;
  icon?: React.ReactNode;
  iconAppearance?: IIconAppearance;
}

function EventCard(props: EventCardProps) {
  const {
    dateAndTime,
    mainTitle,
    message,
    icon = <MdOutlineWarningAmber />,
    iconAppearance = "primary",
  } = props;

  return (
    <StyledEventCard>
      <Stack direction="column" gap={spacing.s100}>
        <Stack alignItems="center" gap={spacing.s100}>
          <Icon icon={icon} appearance={iconAppearance} size="24px" />

          <Stack direction="column" gap={spacing.s100}>
            <Text type="label" size="medium" appearance="gray">
              {labels.data.eventCard.happensOnLabel} {dateAndTime}
            </Text>

            <Text size="medium" weight="bold">
              {mainTitle}
            </Text>

            <Text size="small" appearance="dark">
              {message}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </StyledEventCard>
  );
}

export { EventCard };
export type { EventCardProps };
