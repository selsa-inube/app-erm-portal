import {
  useMediaQuery,
  Text,
  Divider,
  Stack,
  Textarea,
  Button,
  Radio,
} from "@inubekit/inubekit";
import { FormikProps } from "formik";

import { spacing } from "@design/tokens/spacing";

import { StyledFormContainer, StyledInputsContainer } from "./styles";
import { VacationType } from "./types";

interface FormValues {
  approval: string;
  observation: string;
}

interface VacationApprovalFormUIProps {
  formik: FormikProps<FormValues>;
  vacationType: VacationType;
  requestId: string;
  observationsRequired?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function VacationApprovalFormUI({
  formik,
  vacationType,
  requestId,
  observationsRequired = true,
  onSubmit,
}: VacationApprovalFormUIProps): JSX.Element {
  const isMobile = useMediaQuery("(max-width: 950px)");

  const isObservationRequired =
    observationsRequired && formik.values.approval === "reject";

  const isFormValid = isObservationRequired
    ? formik.isValid && formik.values.approval && formik.values.observation
    : formik.isValid && formik.values.approval;

  const vacationConfig = {
    payment: {
      title: `Solicitud de pago vacaciones #${requestId}`,
      daysLabel: "Días a pagar:",
    },
    enjoyment: {
      title: `Solicitud de disfrute vacaciones #${requestId}`,
      daysLabel: "Periodo:",
    },
  };

  const config = vacationConfig[vacationType];

  return (
    <form onSubmit={onSubmit}>
      <StyledFormContainer $isMobile={isMobile}>
        <Text type="title" weight="bold" textAlign="center">
          {config.title}
        </Text>
        <Divider dashed />
        <Stack
          gap={spacing.s100}
          direction="column"
          justifyContent="space-between"
          width="100%"
        >
          <Stack>
            <Text type="label">
              <b>• Empleado:</b> Sergio Andrés Nieto Alba
            </Text>
          </Stack>
          <Stack>
            <Text type="label">
              <b>• {config.daysLabel}</b> 5 días
            </Text>
          </Stack>
        </Stack>
        <StyledInputsContainer $isMobile={isMobile}>
          <Stack direction="column" gap={spacing.s100}>
            <Text appearance="gray">
              Tu decisión sobre las vacaciones de Sergio Andrés es:
            </Text>
            <Stack direction="column" gap={spacing.s100}>
              <Radio
                id="approve"
                name="approval"
                value="approve"
                checked={formik.values.approval === "approve"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  void formik.setFieldValue("approval", e.target.value);
                }}
                label="Aprobar"
              />
              <Radio
                id="reject"
                name="approval"
                value="reject"
                checked={formik.values.approval === "reject"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  void formik.setFieldValue("approval", e.target.value);
                }}
                label="Rechazar"
              />
            </Stack>
          </Stack>
          <Textarea
            label="Observaciones"
            placeholder="Comentarios adicionales a tener en cuenta."
            name="observation"
            id="observation"
            size="compact"
            value={formik.values.observation}
            maxLength={500}
            fullwidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              void formik.setFieldValue("observation", e.target.value);
            }}
            onBlur={formik.handleBlur}
            required={isObservationRequired}
          />
        </StyledInputsContainer>
        <Stack justifyContent="flex-end" width="100%">
          <Button type="submit" appearance="primary" disabled={!isFormValid}>
            Enviar
          </Button>
        </Stack>
      </StyledFormContainer>
    </form>
  );
}

export { VacationApprovalFormUI };
