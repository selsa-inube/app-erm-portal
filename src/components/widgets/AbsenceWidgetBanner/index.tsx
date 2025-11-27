import { Icon, Stack, Text } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import { StyledAbsenceWidgetBanner } from "./styles";

export interface AbsenceWidgetBannerProps {
  icon: JSX.Element;
  label: string;
  value: string;
  isLoading: boolean;
  onClick?: () => void;
}

export const AbsenceWidgetBanner = (props: AbsenceWidgetBannerProps) => {
  const { icon, label, value, isLoading, onClick } = props;

  return (
    <StyledAbsenceWidgetBanner onClick={onClick} clickable={!!onClick}>
      <Stack alignItems="center" gap={spacing.s100}>
        <Icon icon={icon} appearance="primary" size="24px" />
      </Stack>

      {isLoading ? (
        <Text type="label" appearance="gray">
          {label}
        </Text>
      ) : (
        <Text type="label" appearance="gray">
          {value}
        </Text>
      )}
    </StyledAbsenceWidgetBanner>
  );
};
