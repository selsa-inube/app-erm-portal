import { Stack, Text } from "@inubekit/inubekit";
import { StyledEmployeeSeniorityWidget } from "./styles";

export interface EmployeeSeniorityWidgetProps {
  value: number | string;
  unit?: string;
  label?: string;
}

export const EmployeeSeniorityWidget = (
  props: EmployeeSeniorityWidgetProps,
) => {
  const { value, unit = "Años", label = "Antigüedad" } = props;

  return (
    <StyledEmployeeSeniorityWidget>
      <Stack direction="column" gap="4px">
        <Stack alignItems="baseline" gap="6px">
          <Text type="title" size="large" appearance="primary" weight="bold">
            {value}
          </Text>
          <Text type="label" size="small" appearance="dark">
            {unit}
          </Text>
        </Stack>

        <Text type="label" size="small" appearance="gray">
          {label}
        </Text>
      </Stack>
    </StyledEmployeeSeniorityWidget>
  );
};
