import { IOption } from "@inubekit/inubekit";

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
  { id: "1", label: "Código Sustantivo del Trabajo", value: "cst" },
  { id: "2", label: "Código de Comercio", value: "cc" },
  { id: "3", label: "Normatividad Especial", value: "ne" },
];

const contractTypeOptions: IOption[] = [
  { id: "1", label: "Término Indefinido", value: "indefinite_term" },
  { id: "2", label: "Término Fijo", value: "fixed_term" },
  { id: "3", label: "Obra o Labor", value: "project_based" },
];

const companyOptions: IOption[] = [
  { id: "1", label: "Empresa A S.A.S", value: "company_a" },
  { id: "2", label: "Empresa B Ltda", value: "company_b" },
  { id: "3", label: "Empresa C S.A.", value: "company_c" },
];

const workingShiftOptions: IOption[] = [
  { id: "1", label: "Tiempo Completo", value: "full_time" },
  { id: "2", label: "Medio Tiempo", value: "part_time" },
  { id: "3", label: "Por Horas", value: "hourly" },
];

const teamOptions: IOption[] = [
  { id: "1", label: "Desarrollo", value: "development" },
  { id: "2", label: "Marketing", value: "marketing" },
  { id: "3", label: "Recursos Humanos", value: "human_resources" },
];

const positionOptions: IOption[] = [
  { id: "1", label: "Desarrollador Senior", value: "senior_developer" },
  { id: "2", label: "Analista Junior", value: "junior_analyst" },
  { id: "3", label: "Gerente de Proyecto", value: "project_manager" },
];

const salaryProfileOptions: IOption[] = [
  { id: "1", label: "Perfil A - Alto", value: "profile_a" },
  { id: "2", label: "Perfil B - Medio", value: "profile_b" },
  { id: "3", label: "Perfil C - Básico", value: "profile_c" },
];

const jobModeOptions: IOption[] = [
  { id: "1", label: "Presencial", value: "on_site" },
  { id: "2", label: "Remoto", value: "remote" },
  { id: "3", label: "Híbrido", value: "hybrid" },
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
