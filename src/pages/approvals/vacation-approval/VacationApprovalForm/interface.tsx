import {
  useMediaQuery,
  Text,
  Divider,
  Stack,
  Icon,
  Select,
  Textarea,
  Button,
} from "@inubekit/inubekit";
import { MdOutlineBeachAccess } from "react-icons/md";
import { FormikProps } from "formik";

import { VacationApprovalModal } from "@components/modals/VacationApprovalModal";
import { spacing } from "@design/tokens/spacing";

import {
  StyledFormContainer,
  StyledRequestInfo,
  StyledInputsContainer,
} from "./styles";

interface FormValues {
  approval: string;
  observation: string;
}

interface ApprovalOption {
  id: string;
  value: string;
  label: string;
}

interface VacationApprovalFormUIProps {
  formik: FormikProps<FormValues>;
  approvalOptions: ApprovalOption[];
  showModal?: boolean;
  isApproved?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCloseModal?: () => void;
}

function VacationApprovalFormUI({
  formik,
  approvalOptions,
  showModal = false,
  isApproved = false,
  onSubmit,
  onCloseModal,
}: VacationApprovalFormUIProps): JSX.Element {
  const isMobile = useMediaQuery("(max-width: 950px)");

  const isFormValid =
    formik.isValid && formik.values.approval && formik.values.observation;

  return (
    <>
      <form onSubmit={onSubmit}>
        <StyledFormContainer $isMobile={isMobile}>
          <Text type="title" weight="bold" textAlign="center">
            Formulario de aprobación de vacaciones
          </Text>
          <Divider dashed />
          <StyledRequestInfo $isMobile={isMobile}>
            <Stack gap={spacing.s100} alignItems="center">
              <Icon
                appearance="dark"
                icon={<MdOutlineBeachAccess />}
                size="20px"
              />
              <Text type="label" weight="bold">
                Solicitud #898433
              </Text>
            </Stack>
            <Stack
              justifyContent="space-between"
              height="100%"
              direction={isMobile ? "column" : "row"}
            >
              <Stack>
                <Text size="small" appearance="gray">
                  <b>• Empleado:</b> Sergio Andrés Nieto Alba
                </Text>
              </Stack>
              <Stack>
                <Text size="small" appearance="gray">
                  <b>• Tipo de solicitud:</b> Pago de vacaciones
                </Text>
              </Stack>
              <Stack>
                <Text size="small" appearance="gray">
                  <b>• Días a pagar:</b> 5 días
                </Text>
              </Stack>
            </Stack>
          </StyledRequestInfo>
          <StyledInputsContainer $isMobile={isMobile}>
            <Stack direction="column" gap={spacing.s100}>
              <Text appearance="gray">
                ¿Las vacaciones de Sergio Andrés quedan aprobadas?
              </Text>
              <Select
                placeholder="Selecciona de la lista"
                name="approval"
                value={formik.values.approval}
                id="approval"
                size="compact"
                fullwidth
                options={approvalOptions}
                onChange={(_, value: string) => {
                  void formik.setFieldValue("approval", value);
                }}
                onBlur={() => {
                  void formik.setFieldTouched("approval", true);
                }}
              />
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
