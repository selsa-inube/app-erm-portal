const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const normalize = (str: string) =>
  removeAccents(str)
    .toLowerCase()
    .replace(/[\s\-_]/g, "")
    .replace(/s$/, "");

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

const aliases = [
  ["onboarding", "Vinculación"],
  ["vacation enjoyed", "Vacaciones Disfrutadas"],
  ["vacationEnjoyed", "Vacaciones Disfrutadas"],
  ["vacationsEnjoyed", "Vacaciones Disfrutadas"],
  ["paid vacation", "Vacaciones Pagadas"],
  ["paidVacation", "Vacaciones Pagadas"],
  ["certification", "Certificación"],
  ["disability", "Incapacidad"],
  ["leave", "Permiso"],
  ["unpaid_Leave", "Licencia no remunerada"],
  ["unpaidLeave", "Licencia no remunerada"],
  ["leaving_the_Job", "Retiro"],
  ["leavingTheJob", "Retiro"],
  ["salary_increase", "Ascenso salarial"],
  ["salaryIncrease", "Ascenso salarial"],
  ["position_transfer", "Traslado de cargo"],
  ["positionTransfer", "Traslado de cargo"],
  ["absence", "Ausencia"],
  ["Absence", "Ausencia"],
  ["pqr", "PQR"],
];

const requestTypeLabels: Record<string, string> = Object.fromEntries(
  aliases.map(([key, label]) => [normalize(key), label]),
);

export const getRequestTypeLabel = (type: string): string => {
  const normalizedType = normalize(type);
  return requestTypeLabels[normalizedType] || type;
};
