import { FormikProps } from "formik";
import * as Yup from "yup";
import {
  Stack,
  Button,
  Date,
  Grid,
  useMediaQuery,
  Select,
} from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";
import { getFieldState, isRequired } from "@utils/forms";
import { labels } from "@i18n/labels";

import {
  normativeFrameworkOptions,
  contractTypeOptions,
  companyOptions,
  workingShiftOptions,
  teamOptions,
  positionOptions,
  salaryProfileOptions,
  jobModeOptions,
} from "./config/formConfig";
import { IContractualPositionData } from "./types";
import { StyledContainer } from "./styles";

interface ContractualPositionDataFormUIProps {
  formik: FormikProps<IContractualPositionData>;
  validationSchema: Yup.ObjectSchema<Yup.AnyObject>;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

function ContractualPositionDataFormUI(
  props: ContractualPositionDataFormUIProps,
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

  const fieldLabels = labels.employee.contractualPositionForm.fields;
  const placeholders = labels.employee.contractualPositionForm.placeholders;

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
                label={fieldLabels.normativeFramework}
                placeholder={placeholders.select}
                name="normativeFramework"
                id="normativeFramework"
                value={formik.values.normativeFramework}
                message={formik.errors.normativeFramework}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "normativeFramework")}
                onChange={(name, value) => {
                  void formik.setFieldValue(name, value);
                }}
                onBlur={formik.handleBlur}
                options={normativeFrameworkOptions}
              />

              <Select
                label={fieldLabels.contractType}
                placeholder={placeholders.select}
                name="contractType"
                id="contractType"
                value={formik.values.contractType}
                message={formik.errors.contractType}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "contractType")}
                onChange={(name, value) => {
                  void formik.setFieldValue(name, value);
                }}
                onBlur={formik.handleBlur}
                options={contractTypeOptions}
              />

              <Date
                label={fieldLabels.startDate}
                name="startDate"
                id="startDate"
                value={formik.values.startDate}
                status={getFieldState(formik, "startDate")}
                message={formik.errors.startDate}
                disabled={loading}
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "startDate")}
              />

              <Date
                label={fieldLabels.endDate}
                name="endDate"
                id="endDate"
                value={formik.values.endDate}
                status={getFieldState(formik, "endDate")}
                message={formik.errors.endDate}
                disabled
                size="compact"
                fullwidth
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required={isRequired(validationSchema, "endDate")}
              />

              <Select
                label={fieldLabels.company}
                placeholder={placeholders.select}
                name="company"
                id="company"
                value={formik.values.company}
                message={formik.errors.company}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "company")}
                onChange={(name, value) =>
                  void formik.setFieldValue(name, value)
                }
                onBlur={formik.handleBlur}
                options={companyOptions}
              />

              <Select
                label={fieldLabels.workingShift}
                placeholder={placeholders.select}
                name="workingShift"
                id="workingShift"
                value={formik.values.workingShift}
                message={formik.errors.workingShift}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "workingShift")}
                onChange={(name, value) =>
                  void formik.setFieldValue(name, value)
                }
                onBlur={formik.handleBlur}
                options={workingShiftOptions}
              />

              <Select
                label={fieldLabels.team}
                placeholder={placeholders.select}
                name="team"
                id="team"
                value={formik.values.team}
                message={formik.errors.team}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "team")}
                onChange={(name, value) =>
                  void formik.setFieldValue(name, value)
                }
                onBlur={formik.handleBlur}
                options={teamOptions}
              />

              <Select
                label={fieldLabels.position}
                placeholder={placeholders.select}
                name="position"
                id="position"
                value={formik.values.position}
                message={formik.errors.position}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "position")}
                onChange={(name, value) =>
                  void formik.setFieldValue(name, value)
                }
                onBlur={formik.handleBlur}
                options={positionOptions}
              />

              <Select
                label={fieldLabels.salaryProfile}
                placeholder={placeholders.select}
                name="salaryProfile"
                id="salaryProfile"
                value={formik.values.salaryProfile}
                message={formik.errors.salaryProfile}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "salaryProfile")}
                onChange={(name, value) =>
                  void formik.setFieldValue(name, value)
                }
                onBlur={formik.handleBlur}
                options={salaryProfileOptions}
              />

              <Select
                label={fieldLabels.jobMode}
                placeholder={placeholders.select}
                name="jobMode"
                id="jobMode"
                value={formik.values.jobMode}
                message={formik.errors.jobMode}
                disabled={loading}
                size="compact"
                fullwidth
                required={isRequired(validationSchema, "jobMode")}
                onChange={(name, value) =>
                  void formik.setFieldValue(name, value)
                }
                onBlur={formik.handleBlur}
                options={jobModeOptions}
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
              {labels.employee.assisted.back}
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={loading ?? !formik.isValid}
            >
              {labels.employee.assisted.next}
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export { ContractualPositionDataFormUI };
