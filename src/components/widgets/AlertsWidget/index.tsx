import { Icon, Stack, Text } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import { StyledAlertWidgetBanner } from "./styles";

export interface AlertWidgetBannerProps {
  icon: JSX.Element;
  value: number | string;
  isLoading: boolean;
  onClick?: () => void;
}

export const AlertWidgetBanner = (props: AlertWidgetBannerProps) => {
  const { icon, value, isLoading, onClick } = props;

  const baseLabel = "Alertas";

  const newLabel = `${baseLabel} (${value})`;

  return (
    <StyledAlertWidgetBanner onClick={onClick} clickable={!!onClick}>
      <Stack alignItems="center" gap={spacing.s100}>
        <Icon icon={icon} appearance="primary" size="24px" />
      </Stack>
      {isLoading ? (
        <Text type="label" appearance="gray">
          {baseLabel}
        </Text>
      ) : (
        <Text type="label" appearance="gray">
          {newLabel}
        </Text>
      )}
    </StyledAlertWidgetBanner>
  );
};
