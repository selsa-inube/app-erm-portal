import { IOption } from "@inubekit/inubekit";
import { labels } from "@src/i18n/labels";

const contractualPositionDataRequiredFields = {
  normativeFramework: true,
  contractType: true,
  startDate: true,
  endDate: true,
  company: true,
  workingShift: true,
  team: true,
  position: true,
  salaryProfile: true,
  jobMode: true,
};

const normativeFrameworkOptions: IOption[] = [
  {
    id: "1",
    label:
      labels.employee.contractualPositionForm.options.normativeFramework.cst,
    value: "cst",
  },
  {
    id: "2",
    label:
      labels.employee.contractualPositionForm.options.normativeFramework.cc,
    value: "cc",
  },
  {
    id: "3",
    label:
      labels.employee.contractualPositionForm.options.normativeFramework.ne,
    value: "ne",
  },
];

const contractTypeOptions: IOption[] = [
  {
    id: "1",
    label:
      labels.employee.contractualPositionForm.options.contractType
        .indefinite_term,
    value: "indefinite_term",
  },
  {
    id: "2",
    label:
      labels.employee.contractualPositionForm.options.contractType.fixed_term,
    value: "fixed_term",
  },
  {
    id: "3",
    label:
      labels.employee.contractualPositionForm.options.contractType
        .project_based,
    value: "project_based",
  },
];

const companyOptions: IOption[] = [
  {
    id: "1",
    label: labels.employee.contractualPositionForm.options.company.company_a,
    value: "company_a",
  },
  {
    id: "2",
    label: labels.employee.contractualPositionForm.options.company.company_b,
    value: "company_b",
  },
  {
    id: "3",
    label: labels.employee.contractualPositionForm.options.company.company_c,
    value: "company_c",
  },
];

const workingShiftOptions: IOption[] = [
  {
    id: "1",
    label:
      labels.employee.contractualPositionForm.options.workingShift.full_time,
    value: "full_time",
  },
  {
    id: "2",
    label:
      labels.employee.contractualPositionForm.options.workingShift.part_time,
    value: "part_time",
  },
  {
    id: "3",
    label: labels.employee.contractualPositionForm.options.workingShift.hourly,
    value: "hourly",
  },
];

const teamOptions: IOption[] = [
  {
    id: "1",
    label: labels.employee.contractualPositionForm.options.team.development,
    value: "development",
  },
  {
    id: "2",
    label: labels.employee.contractualPositionForm.options.team.marketing,
    value: "marketing",
  },
  {
    id: "3",
    label: labels.employee.contractualPositionForm.options.team.human_resources,
    value: "human_resources",
  },
];

const positionOptions: IOption[] = [
  {
    id: "1",
    label:
      labels.employee.contractualPositionForm.options.position.senior_developer,
    value: "senior_developer",
  },
  {
    id: "2",
    label:
      labels.employee.contractualPositionForm.options.position.junior_analyst,
    value: "junior_analyst",
  },
  {
    id: "3",
    label:
      labels.employee.contractualPositionForm.options.position.project_manager,
    value: "project_manager",
  },
];

const salaryProfileOptions: IOption[] = [
  {
    id: "1",
    label:
      labels.employee.contractualPositionForm.options.salaryProfile.profile_a,
    value: "profile_a",
  },
  {
    id: "2",
    label:
      labels.employee.contractualPositionForm.options.salaryProfile.profile_b,
    value: "profile_b",
  },
  {
    id: "3",
    label:
      labels.employee.contractualPositionForm.options.salaryProfile.profile_c,
    value: "profile_c",
  },
];

const jobModeOptions: IOption[] = [
  {
    id: "1",
    label: labels.employee.contractualPositionForm.options.jobMode.on_site,
    value: "on_site",
  },
  {
    id: "2",
    label: labels.employee.contractualPositionForm.options.jobMode.remote,
    value: "remote",
  },
  {
    id: "3",
    label: labels.employee.contractualPositionForm.options.jobMode.hybrid,
    value: "hybrid",
  },
];

export {
  contractualPositionDataRequiredFields,
  normativeFrameworkOptions,
  contractTypeOptions,
  companyOptions,
  workingShiftOptions,
  teamOptions,
  positionOptions,
  salaryProfileOptions,
  jobModeOptions,
};
