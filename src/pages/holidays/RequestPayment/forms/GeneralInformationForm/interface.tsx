import { useEffect, useMemo } from "react";
import { FormikProps } from "formik";
import { ObjectSchema, AnyObject } from "yup";
import {
  Stack,
  Button,
  Select,
  Textarea,
  Textfield,
  useMediaQuery,
} from "@inubekit/inubekit";

import { isRequired, getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext";
import { contractTypeLabels } from "@mocks/contracts/enums";

import { IUnifiedHumanResourceRequestData } from "@ptypes/humanResourcesRequest.types";
import { StyledContainer } from "./styles";

function getDisabledState(loading: boolean | undefined, isValid: boolean) {
  return loading ? true : !isValid;
}

interface GeneralInformationFormUIProps {
  formik: FormikProps<IUnifiedHumanResourceRequestData>;
  validationSchema: ObjectSchema<AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const {
    formik,
    loading,
    withNextButton,
    validationSchema,
    handlePreviousStep,
    handleNextStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const { selectedEmployee } = useAppContext();

  const contractOptions = useMemo(
    () =>
      (selectedEmployee.employmentContracts ?? []).map((c) => ({
        id: c.contractId,
        value: c.contractId,
        label: `${c.businessName} - ${contractTypeLabels[c.contractType]}`,
      })),
    [selectedEmployee.employmentContracts],
  );

  const handleContractChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    const found = contractOptions.find((option) => option.value === value);
    formik.setFieldValue("contractDesc", found?.label ?? "");
  };

  useEffect(() => {
    if (contractOptions.length === 1 && !formik.values.contractId) {
      const onlyOption = contractOptions[0];
      handleContractChange("contractId", onlyOption.value);
    }
  }, [contractOptions, formik.values.contractId]);

  return (
    <form>
      <Stack direction="column" gap={isMobile ? spacing.s300 : spacing.s400}>
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s200}>
            <Stack direction={isMobile ? "column" : "row"} gap={spacing.s200}>
              <Textfield
                label="Días hábiles a pagar"
                placeholder="Ej: 2"
                name="daysToPay"
                id="daysToPay"
                type="number"
                value={formik.values.daysToPay}
                status={getFieldState(formik, "daysToPay")}
                message={formik.errors.daysToPay}
                disabled={loading}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "daysToPay")}
              />
              {contractOptions.length > 1 && (
                <Select
                  label="Contrato"
                  name="contractId"
                  options={contractOptions}
                  placeholder="Selecciona de la lista"
                  value={formik.values.contractId}
                  message={formik.errors.contractId}
                  disabled={loading}
                  size="compact"
                  fullwidth
                  onChange={(_, v) => {
                    formik.setFieldValue("contractId", v);
                    const contrato = selectedEmployee.employmentContracts?.find(
                      (c) => c.contractId === v,
                    );

                    if (contrato) {
                      formik.setFieldValue(
                        "businessName",
                        contrato.businessName,
                      );
                      formik.setFieldValue(
                        "contractType",
                        contrato.contractType,
                      );
                      formik.setFieldValue(
                        "contractNumber",
                        contrato.contractNumber,
                      );
                    }
                  }}
                  required={isRequired(props.validationSchema, "contractId")}
                />
              )}
            </Stack>

            <Textarea
              label="Observaciones"
              placeholder="Detalles a tener en cuenta."
              name="observationEmployee"
              id="observationEmployee"
              value={formik.values.observationEmployee}
              maxLength={1000}
              disabled={loading}
              status={getFieldState(formik, "observationEmployee")}
              message={formik.errors.observationEmployee}
              fullwidth
              required={isRequired(validationSchema, "observationEmployee")}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </Stack>
        </StyledContainer>

        {withNextButton && (
          <Stack justifyContent="flex-end" gap={spacing.s250}>
            <Button
              appearance="gray"
              variant="outlined"
              onClick={handlePreviousStep}
            >
              Anterior
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={getDisabledState(loading, formik.isValid)}
            >
              Siguiente
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { GeneralInformationFormUI };
export type { GeneralInformationFormUIProps };
