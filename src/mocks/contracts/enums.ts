export const contractTypeLabels: Record<string, string> = {
  Apprentice: "Aprendiz",
  ByWorkOrLabor: "Por obra o labor",
  CivilContract: "Contrato civil",
  ContingentWorker: "Trabajador eventual",
  FixedTermContract: "Termino Fijo",
  PermanentJob: "Trabajo permanente",
};

export const workScheduleLabels: Record<string, string> = {
  Free: "Libre",
  FullTime: "Tiempo completo",
  NightWork: "Trabajo nocturno",
  PartTimeJob: "Medio tiempo",
  Shift: "Por turnos",
};

export const workplaceLabels: Record<string, string> = {
  HibridWork: "Trabajo híbrido",
  OnSiteWork: "Trabajo presencial",
  Telecommuting: "Teletrabajo",
};

export enum EDetailedRequestStatus {
  Closed = "closed",
  Rejected = "rejected",
  Canceled = "canceled",
  SupervisorApproval = "supervisor_approval",
  HRComplianceVerification = "HR_compliance_verification",
  ConfirmationOfVacationTaken = "confirmation_of_vacation_taken",
  SuccessfullyProcessed = "successfully_processed",
  CertificationGeneration = "certification_generation",
  OnboardingInProgress = "onboarding_in_progress",
}

export const getDetailedStatusLabel = (
  status: EDetailedRequestStatus,
): string => {
  const statusMap: Record<EDetailedRequestStatus, string> = {
    [EDetailedRequestStatus.Closed]: "Cerrada",
    [EDetailedRequestStatus.Rejected]: "Rechazada",
    [EDetailedRequestStatus.Canceled]: "Cancelada",
    [EDetailedRequestStatus.SupervisorApproval]: "Aprobación Jefe Inmediato",
    [EDetailedRequestStatus.HRComplianceVerification]:
      "Verificación en Gestión Humana",
    [EDetailedRequestStatus.ConfirmationOfVacationTaken]:
      "Confirmación Disfrute de Vacaciones",
    [EDetailedRequestStatus.SuccessfullyProcessed]: "Tramitada con Éxito",
    [EDetailedRequestStatus.CertificationGeneration]:
      "Generación de la Certificación",
    [EDetailedRequestStatus.OnboardingInProgress]: "Vinculación en Progreso",
  };

  return statusMap[status] ?? "Estado desconocido";
};
