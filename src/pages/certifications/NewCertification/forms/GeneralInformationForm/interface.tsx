import { FormikProps } from "formik";
import { useEffect, useMemo } from "react";
import { ObjectSchema, AnyObject } from "yup";
import {
  Stack,
  Button,
  Select,
  Textarea,
  Input,
  useMediaQuery,
} from "@inubekit/inubekit";

import { getFieldState } from "@utils/forms/forms";
import { spacing } from "@design/tokens/spacing";
import { useAppContext } from "@context/AppContext";
import { certificationOptions } from "@pages/certifications/NewCertification/config/assisted.config";
import { contractTypeLabels } from "@mocks/contracts/enums";

import { ICertificationData } from "@ptypes/humanResourcesRequest.types";
import { StyledContainer } from "./styles";

interface GeneralInformationFormUIProps {
  formik: FormikProps<ICertificationData>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  validationSchema?: ObjectSchema<AnyObject>;
}

function getDisabledState(loading: boolean | undefined, isValid: boolean) {
  return loading ? true : !isValid;
}

const GeneralInformationFormUI = ({
  formik,
  loading,
  withNextButton,
  handleNextStep,
  handlePreviousStep,
}: GeneralInformationFormUIProps) => {
  const { selectedEmployee } = useAppContext();

  const contractOptions = useMemo(
    () =>
      (selectedEmployee.employmentContracts ?? []).map((c) => ({
        id: c.contractId,
        value: `${c.businessName} - ${contractTypeLabels[c.contractType]}`,
        label: `${c.businessName} - ${contractTypeLabels[c.contractType]}`,
      })),
    [selectedEmployee.employmentContracts],
  );

  const handleContractChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    formik.setFieldValue(
      "contractDesc",
      contractOptions.find((option) => option.value === value)?.label,
    );
  };

  useEffect(() => {
    if (contractOptions.length === 1 && !formik.values.contract) {
      const onlyOption = contractOptions[0];
      handleContractChange("contract", onlyOption.value);
    }
  }, [formik.values.contract]);

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction="column" gap={spacing.s300}>
        <StyledContainer $isMobile={isMobile}>
          <Stack
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? spacing.s200 : spacing.s300}
          >
            <Select
              name="certification"
              size="compact"
              label="Tipo de certificación"
              fullwidth
              options={certificationOptions}
              placeholder="Selecciona de la lista"
              value={formik.values.certification}
              onChange={(name, value) => {
                void formik.setFieldValue(name, value);
              }}
            />
            <Input
              size="compact"
              fullwidth
              counter
              id="addressee"
              required
              label="Destinatario"
              maxLength={60}
              name="addressee"
              placeholder="Ej: A quien interese"
              value={formik.values.addressee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Stack>

          {contractOptions.length > 1 && (
            <Select
              label="Contrato"
              name="contract"
              id="contract"
              options={contractOptions}
              placeholder="Selecciona de la lista"
              value={formik.values.contract}
              message={
                typeof formik.errors.contract === "string"
                  ? formik.errors.contract
                  : undefined
              }
              disabled={getDisabledState(
                loading,
                contractOptions.length !== 1 || !formik.values.contract,
              )}
              size="compact"
              fullwidth
              onBlur={formik.handleBlur}
              onChange={handleContractChange}
            />
          )}

          <Textarea
            label="Observaciones"
            placeholder="Detalles a tener en cuenta."
            name="observations"
            id="observations"
            value={formik.values.observations}
            maxLength={1000}
            disabled={loading}
            status={getFieldState(formik, "observations")}
            message={
              typeof formik.errors.observations === "string"
                ? formik.errors.observations
                : undefined
            }
            fullwidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </StyledContainer>

        {withNextButton && (
          <Stack justifyContent="flex-end" gap={spacing.s200}>
            <Button
              appearance="gray"
              variant="outlined"
              onClick={handlePreviousStep}
            >
              Anterior
            </Button>
            <Button
              type="submit"
              disabled={loading ?? !formik.isValid}
              onClick={() => {
                handleNextStep();
              }}
            >
              Siguiente
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
};

export { GeneralInformationFormUI };
