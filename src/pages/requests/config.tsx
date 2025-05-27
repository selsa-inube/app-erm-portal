import { IOption } from "./types";

export const assignmentOptions: IOption[] = [
  { id: "1", label: "Ascenso salarial", value: "Ascenso Salarial" },
  { id: "2", label: "Certificación", value: "Solicitud de Certificación" },
  { id: "3", label: "Incapacidad", value: "incapacidad" },
  { id: "4", label: "Licencia no remunerada", value: "Licencia No Remunerada" },
  { id: "5", label: "Permiso", value: "permiso" },
];

export const statusOptions: IOption[] = [
  { id: "1", label: "Por evaluar", value: "Por evaluar" },
  { id: "2", label: "En progreso", value: "En progreso" },
  { id: "3", label: "Terminada", value: "terminada" },
];
