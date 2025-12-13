import {
  jobModeOptions,
  companyOptions,
  contractTypeOptions,
  normativeFrameworkOptions,
  positionOptions,
  salaryProfileOptions,
  teamOptions,
  workingShiftOptions,
} from "../../../ContractualPositionDataForm/config/formConfig";

import {
  proyectOptions,
  costCenterOptions,
  zonalSegmentationOptions,
} from "../../../LegalAccountingLocationForm/config/formConfig";

const getLabelFromValue = (
  options: { id: string; label: string; value: string }[],
  value: string,
): string => {
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
};

export const getNormativeFrameworkLabel = (value: string) =>
  getLabelFromValue(normativeFrameworkOptions, value);

export const getContractTypeLabel = (value: string) =>
  getLabelFromValue(contractTypeOptions, value);

export const getCompanyLabel = (value: string) =>
  getLabelFromValue(companyOptions, value);

export const getWorkingShiftLabel = (value: string) =>
  getLabelFromValue(workingShiftOptions, value);

export const getTeamLabel = (value: string) =>
  getLabelFromValue(teamOptions, value);

export const getPositionLabel = (value: string) =>
  getLabelFromValue(positionOptions, value);

export const getSalaryProfileLabel = (value: string) =>
  getLabelFromValue(salaryProfileOptions, value);

export const getJobModeLabel = (value: string) =>
  getLabelFromValue(jobModeOptions, value);

export const getProyectLabel = (value: string) =>
  getLabelFromValue(proyectOptions, value);

export const getZonalSegmentationLabel = (value: string) =>
  getLabelFromValue(zonalSegmentationOptions, value);

export const getCostCenterLabel = (value: string) =>
  getLabelFromValue(costCenterOptions, value);
