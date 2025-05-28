import { IOption } from "./types";

export const assignmentOptions: IOption[] = [
  { id: "1", label: "Vinculación", value: "onboarding" },
  { id: "2", label: "Vacaciones Disfrutadas", value: "vacationEnjoyed" },
  { id: "3", label: "Vacaciones Pagadas", value: "paidVacation" },
  { id: "4", label: "Certificación", value: "certification" },
  { id: "5", label: "Incapacidad", value: "disability" },
  { id: "6", label: "Permiso", value: "leave" },
  { id: "7", label: "Licencia no remunerada", value: "unpaidLeave" },
  { id: "8", label: "Retiro", value: "leavingTheJob" },
  { id: "9", label: "Ascenso salarial", value: "salaryIncrease" },
  { id: "10", label: "Traslado de cargo", value: "positionTransfer" },
  { id: "11", label: "Ausencia", value: "absence" },
  { id: "12", label: "PQR", value: "pqr" },
];

export const statusOptions: IOption[] = [
  { id: "1", label: "Por evaluar", value: "Por evaluar" },
  { id: "2", label: "En progreso", value: "En progreso" },
  { id: "3", label: "Terminada", value: "terminada" },
];
