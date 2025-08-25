export const contractTypeLabels: Record<string, string> = {
  apprentice: "Aprendiz",
  by_work_or_labor: "Por obra o labor",
  civil_contract: "Contrato civil",
  contingent_worker: "Trabajador eventual",
  fixed_term_contract: "Término fijo",
  permanent_job: "Trabajo permanente",
  indefinite: "Indefinido",
};

export const workScheduleLabels: Record<string, string> = {
  Free: "Libre",
  FullTime: "Tiempo completo",
  NightWork: "Trabajo nocturno",
  PartTimeJob: "Medio tiempo",
  Shift: "Por turnos",
  tuesday_to_sunday: "Martes a domingo",
  monday_to_friday: "Lunes a viernes",
  weekend: "Fin de semana",
};

export const workplaceLabels: Record<string, string> = {
  HibridWork: "Trabajo híbrido",
  OnSiteWork: "Trabajo presencial",
  Telecommuting: "Teletrabajo",

  telecommuting: "Teletrabajo",
  on_site: "Trabajo presencial",
  hybrid: "Trabajo híbrido",
};

export enum EDetailedRequestStatus {
  closed = "closed",
  rejected = "rejected",
  canceled = "canceled",
  supervisor_approval = "supervisor_approval",
  HR_compliance_verification = "HR_compliance_verification",
  confirmation_of_vacation_taken = "confirmation_of_vacation_taken",
  successfully_processed = "successfully_processed",
  certification_generation = "certification_generation",
  onboarding_in_progress = "onboarding_in_progress",
}

export const getDetailedStatusLabel = (
  status: EDetailedRequestStatus,
): string => {
  const statusMap: Record<EDetailedRequestStatus, string> = {
    [EDetailedRequestStatus.closed]: "Cerrada",
    [EDetailedRequestStatus.rejected]: "Rechazada",
    [EDetailedRequestStatus.canceled]: "Cancelada",
    [EDetailedRequestStatus.supervisor_approval]: "Aprobación Jefe Inmediato",
    [EDetailedRequestStatus.HR_compliance_verification]:
      "Verificación en Gestión Humana",
    [EDetailedRequestStatus.confirmation_of_vacation_taken]:
      "Confirmación Disfrute de Vacaciones",
    [EDetailedRequestStatus.successfully_processed]: "Tramitada con Éxito",
    [EDetailedRequestStatus.certification_generation]:
      "Generación de la Certificación",
    [EDetailedRequestStatus.onboarding_in_progress]: "Vinculación en Progreso",
  };

  return statusMap[status] ?? "Estado desconocido";
};
