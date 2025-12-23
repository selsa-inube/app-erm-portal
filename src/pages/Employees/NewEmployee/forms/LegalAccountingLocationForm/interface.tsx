import { FormikProps } from "formik";
import * as Yup from "yup";
import { Stack, Button, Grid, useMediaQuery, Select } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";
import { isRequired } from "@utils/forms";
import { labels } from "@i18n/labels";

import {
  proyectOptions,
  zonalSegmentationOptions,
  costCenterOptions,
} from "./config/formConfig";
import { ILegalAccountingLocation } from "./types";
import { StyledContainer } from "./styles";

interface LegalAccountingLocationFormUIProps {
  formik: FormikProps<ILegalAccountingLocation>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function LegalAccountingLocationFormUI(
  props: LegalAccountingLocationFormUIProps,
) {
  const {
    formik,
    loading,
    withNextButton,
    validationSchema,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const { employee } = labels;

  return (
    <form>
      <Stack
        direction="column"
        gap={isMobile ? spacing.s300 : spacing.s400}
        height="60vh"
        justifyContent="space-between"
      >
        <StyledContainer $isMobile={isMobile}>
          <Stack direction="column" width="100%" gap={spacing.s250}>
            <Grid
              templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
              gap={spacing.s200}
              width="100%"
              autoRows="unset"
            >
              <Select
                label={employee.legalAccountingLocationForm.fields.project}
                placeholder={
                  employee.legalAccountingLocationForm.placeholders.select
                }
                name="proyect"
                id="proyect"
                value={formik.values.proyect}
                message={formik.errors.proyect}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "proyect")}
                onChange={(name, value) => {
                  void formik.setFieldValue(name, value);
                }}
                onBlur={formik.handleBlur}
                options={proyectOptions}
              />

              <Select
                label={
                  employee.legalAccountingLocationForm.fields.zonalSegmentation
                }
                placeholder={
                  employee.legalAccountingLocationForm.placeholders.select
                }
                name="zonalSegmentation"
                id="zonalSegmentation"
                value={formik.values.zonalSegmentation}
                message={formik.errors.zonalSegmentation}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "zonalSegmentation")}
                onChange={(name, value) => {
                  void formik.setFieldValue(name, value);
                }}
                onBlur={formik.handleBlur}
                options={zonalSegmentationOptions}
              />

              <Select
                label={employee.legalAccountingLocationForm.fields.costCenter}
                placeholder={
                  employee.legalAccountingLocationForm.placeholders.select
                }
                name="costCenter"
                id="costCenter"
                value={formik.values.costCenter}
                message={formik.errors.costCenter}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "costCenter")}
                onChange={(name, value) =>
                  void formik.setFieldValue(name, value)
                }
                onBlur={formik.handleBlur}
                options={costCenterOptions}
              />
            </Grid>
          </Stack>
        </StyledContainer>

        {withNextButton && (
          <Stack justifyContent="flex-end" gap={spacing.s250}>
            <Button
              onClick={handlePreviousStep}
              appearance="gray"
              variant="outlined"
            >
              {employee.legalAccountingLocationForm.actions.previous}
            </Button>

            <Button
              onClick={handleNextStep}
              disabled={loading ?? !formik.isValid}
            >
              {employee.legalAccountingLocationForm.actions.next}
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { LegalAccountingLocationFormUI };
