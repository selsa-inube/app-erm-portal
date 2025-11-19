export interface IEmployeeAlert {
  id: string;
  type: "fiveYearService" | "certificates" | "general";
  title: string;
  description: string;
  date: string;
}
export const employeeAlertsMock: IEmployeeAlert[] = [
  {
    id: "a1",
    type: "fiveYearService",
    title: "¡Felicidades! Quinquenio Cumplido 🎉",
    description:
      "El empleado está próximo a cumplir 5 años de antigüedad. ¡Revisar beneficios!",
    date: "2025-11-20",
  },
  {
    id: "a2",
    type: "certificates",
    title: "Certificado pendiente",
    description:
      "Hay un certificado laboral pendiente de generación para el empleado.",
    date: "2025-11-15",
  },
];
