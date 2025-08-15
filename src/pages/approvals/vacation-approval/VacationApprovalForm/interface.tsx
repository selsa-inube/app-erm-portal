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

import { VacationApprovalModal } from "@components/modals/VacationApprovalModal";
import { spacing } from "@design/tokens/spacing";
import { capitalizeWords } from "@utils/text";

import { StyledFormContainer, StyledInputsContainer } from "./styles";

const APPROVAL_OPTIONS = {
  APPROVE: "approve",
  REJECT: "reject",
} as const;

const VACATION_TYPES = {
  PAID: "paid_vacations",
} as const;

const MAX_OBSERVATION_LENGTH = 500;
const MOBILE_BREAKPOINT = "(max-width: 950px)";

interface FormValues {
  approval: string;
  observation: string;
}

interface VacationApprovalFormUIProps {
  formik: FormikProps<FormValues>;
  vacationType?: string;
  requestId?: string;
  observationsRequired?: boolean;
  showModal?: boolean;
  isApproved?: boolean;
  employeeName?: string;
  employeeSurname?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCloseModal?: () => void;
}

const getFormTitle = (vacationType: string, requestId: string): string => {
  const isPaidVacation = vacationType === VACATION_TYPES.PAID;
  const titlePrefix = isPaidVacation
    ? "Solicitud de pago vacaciones"
    : "Solicitud de disfrute vacaciones";

  return `${titlePrefix} #${requestId}`;
};

const getEmployeeDisplayName = (name?: string, surname?: string): string => {
  if (!name || !surname) return "";
  return `${capitalizeWords(name)} ${capitalizeWords(surname)}`;
};

const getPeriodLabel = (vacationType: string): string => {
  return vacationType === VACATION_TYPES.PAID ? "Días a pagar: " : "Periodo: ";
};

function VacationApprovalFormUI({
  formik,
  vacationType = "",
  requestId = "",
  observationsRequired = true,
  showModal = false,
  isApproved = false,
  employeeName,
  employeeSurname,
  onSubmit,
  onCloseModal,
}: VacationApprovalFormUIProps): JSX.Element {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);

  const isObservationRequired =
    observationsRequired && formik.values.approval === APPROVAL_OPTIONS.REJECT;

  const isFormValid = isObservationRequired
    ? formik.isValid && formik.values.approval && formik.values.observation
    : formik.isValid && formik.values.approval;

  const formTitle = getFormTitle(vacationType, requestId);
  const employeeDisplayName = getEmployeeDisplayName(
    employeeName,
    employeeSurname,
  );
  const periodLabel = getPeriodLabel(vacationType);

  const handleApprovalChange = (value: string) => {
    void formik.setFieldValue("approval", value);
  };

  const handleObservationChange = (value: string) => {
    void formik.setFieldValue("observation", value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <StyledFormContainer $isMobile={isMobile}>
          <Text type="title" weight="bold" textAlign="center">
            {formTitle}
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
                <b>• Empleado:</b>
                {` ${employeeDisplayName}`}
              </Text>
            </Stack>
            <Stack>
              <Text type="label">
                <b>• {periodLabel}</b>5 días
              </Text>
            </Stack>
          </Stack>

          <StyledInputsContainer $isMobile={isMobile}>
            <Stack direction="column" gap={spacing.s100}>
              <Text appearance="gray">
                Tu decisión sobre las vacaciones de{" "}
                {capitalizeWords(employeeName ?? "")} es:
              </Text>
              <Stack direction="column" gap={spacing.s100}>
                <Radio
                  id="approve"
                  name="approval"
                  value={APPROVAL_OPTIONS.APPROVE}
                  checked={formik.values.approval === APPROVAL_OPTIONS.APPROVE}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleApprovalChange(e.target.value);
                  }}
                  label="Aprobar"
                />
                <Radio
                  id="reject"
                  name="approval"
                  value={APPROVAL_OPTIONS.REJECT}
                  checked={formik.values.approval === APPROVAL_OPTIONS.REJECT}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleApprovalChange(e.target.value);
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
              maxLength={MAX_OBSERVATION_LENGTH}
              fullwidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleObservationChange(e.target.value);
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

      {showModal && (
        <VacationApprovalModal
          isApproved={isApproved}
          onCloseModal={onCloseModal}
          portalId="portal"
        />
      )}
    </>
  );
}

export { VacationApprovalFormUI };
