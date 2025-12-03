import { Grid } from "@inubekit/inubekit";
import { BoxAttribute } from "@components/cards/BoxAttribute";
import { spacing } from "@design/tokens/spacing";
import { AlertCardProps } from "@components/data/AlertCard";
import { labels } from "@i18n/labels";

import { IFormsUpdateData } from "../../../types";
import { IPersonalDataEntry } from "../../PersonalDataForm/types";
import { IContractualPositionData } from "../../ContractualPositionDataForm/types";
import { ILegalAccountingLocation } from "../../LegalAccountingLocationForm/types";
import { IAssignment } from "../../../types";

const renderPersonalInfoVerification = (
  values: IPersonalDataEntry,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={spacing.s100}
    width="100%"
  >
    <BoxAttribute
      label={labels.employee.personalDataForm.fields.names}
      value={values.names}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.personalDataForm.fields.lastNames}
      value={values.lastNames}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.personalDataForm.fields.identificationNumber}
      value={values.identificationNumber}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.personalDataForm.fields.resume}
      value={values.attachedFile?.name}
      direction="column"
    />
  </Grid>
);

const renderContractualPositionVerification = (
  values: IContractualPositionData,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={spacing.s100}
    width="100%"
  >
    <BoxAttribute
      label={labels.employee.contractualPositionForm.fields.normativeFramework}
      value={values.normativeFramework}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.contractualPositionForm.fields.contractType}
      value={values.contractType}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.contractualPositionForm.fields.startDate}
      value={values.startDate}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.contractualPositionForm.fields.endDate}
      value={values.endDate}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.contractualPositionForm.fields.company}
      value={values.company}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.contractualPositionForm.fields.workingShift}
      value={values.workingShift}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.contractualPositionForm.fields.team}
      value={values.team}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.contractualPositionForm.fields.position}
      value={values.position}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.contractualPositionForm.fields.salaryProfile}
      value={values.salaryProfile}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.contractualPositionForm.fields.jobMode}
      value={values.jobMode}
      direction="column"
    />
  </Grid>
);

const renderLegalAccountingLocationVerification = (
  values: ILegalAccountingLocation,
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={spacing.s100}
    width="100%"
  >
    <BoxAttribute
      label={labels.employee.legalAccountingLocationForm.fields.project}
      value={values.proyect}
      direction="column"
    />
    <BoxAttribute
      label={
        labels.employee.legalAccountingLocationForm.fields.zonalSegmentation
      }
      value={values.zonalSegmentation}
      direction="column"
    />
    <BoxAttribute
      label={labels.employee.legalAccountingLocationForm.fields.costCenter}
      value={values.costCenter}
      direction="column"
    />
  </Grid>
);

const renderAssignmentsVerification = (
  assignments: IAssignment[],
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={spacing.s100}
    width="100%"
  >
    {assignments.map((assignment, index) => (
      <BoxAttribute
        key={index}
        label={assignment.assignment}
        value={assignment.value}
        direction="column"
      />
    ))}
  </Grid>
);

const renderUnmetRequirementsVerification = (
  unmetRequirements: AlertCardProps[],
  isTablet: boolean,
) => (
  <Grid
    templateColumns={`repeat(${isTablet ? 1 : 2}, 1fr)`}
    autoRows="auto"
    gap={spacing.s100}
    width="100%"
  >
    {unmetRequirements.map((requirement, index) => (
      <BoxAttribute
        key={index}
        label={`Requisito: ${requirement.requirement}`}
        value={requirement.cause}
        direction="column"
      />
    ))}
  </Grid>
);

interface VerificationBoxesProps {
  updatedData: IFormsUpdateData;
  stepKey: number;
  isTablet: boolean;
}

function VerificationBoxes({
  updatedData,
  stepKey,
  isTablet,
}: VerificationBoxesProps) {
  return (
    <>
      {stepKey === 1 &&
        renderPersonalInfoVerification(
          updatedData.personalInformation.values,
          isTablet,
        )}
      {stepKey === 2 &&
        renderContractualPositionVerification(
          updatedData.contractualPositionData.values,
          isTablet,
        )}
      {stepKey === 3 &&
        renderLegalAccountingLocationVerification(
          updatedData.legalAccountingLocation.values,
          isTablet,
        )}
      {stepKey === 4 &&
        renderAssignmentsVerification(
          updatedData.assignmentForm.values,
          isTablet,
        )}
      {stepKey === 5 &&
        renderUnmetRequirementsVerification(
          updatedData.unmetRequirements.values,
          isTablet,
        )}
    </>
  );
}

export { VerificationBoxes };
