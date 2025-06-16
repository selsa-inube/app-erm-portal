import { Icon, Stack, Text, SkeletonIcon } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import { IStyledWidgetBanner } from "./styles";

export interface WidgetBannerProps {
  icon: JSX.Element;
  value: number | string;
  label: string;
  isLoading: boolean;
  onClick?: () => void;
}

export const WidgetBanner = (props: WidgetBannerProps) => {
  const { icon, value, label, isLoading, onClick } = props;

  return (
    <IStyledWidgetBanner onClick={onClick} clickable={!!onClick}>
      <Stack alignItems="center" gap={spacing.s100}>
        <Icon icon={icon} appearance="gray" size="24px" />
        {isLoading ? (
          <SkeletonIcon animated />
        ) : (
          <Text type="title" weight="bold" size="large" appearance="primary">
            {value}
          </Text>
        )}
      </Stack>
      <Text type="label" appearance="gray">
        {label}
      </Text>
    </IStyledWidgetBanner>
  );
};
