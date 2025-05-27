export enum HumanResourceRequestType {
  onboarding = "onboarding",
  vacationEnjoyed = "vacation enjoyed",
  paidVacation = "paid vacation",
  certification = "certification",
  disability = "disability",
  leave = "leave",
  unpaidLeave = "unpaid_Leave",
  leavingTheJob = "leaving_the_Job",
  salaryIncrease = "salary_increase",
  positionTransfer = "position_transfer",
  absence = "Absence",
  pqr = "pqr",
}

const normalize = (str: string) => str.toLowerCase().replace(/[\s\-_]/g, "");

const requestTypeLabels: Record<string, string> = {
  [normalize("onboarding")]: "Vinculación",
  [normalize("vacation enjoyed")]: "Vacaciones Disfrutadas",
  [normalize("paid vacation")]: "Vacaciones Pagadas",
  [normalize("certification")]: "Certificación",
  [normalize("disability")]: "Incapacidad",
  [normalize("leave")]: "Permiso",
  [normalize("unpaid_Leave")]: "Licencia no remunerada",
  [normalize("leaving_the_Job")]: "Retiro",
  [normalize("salary_increase")]: "Ascenso salarial",
  [normalize("position_transfer")]: "Traslado de cargo",
  [normalize("Absence")]: "Ausencia",
  [normalize("pqr")]: "PQR",
};

export const getRequestTypeLabel = (type: string): string => {
  const normalizedType = normalize(type);
  return requestTypeLabels[normalizedType] || type;
};
