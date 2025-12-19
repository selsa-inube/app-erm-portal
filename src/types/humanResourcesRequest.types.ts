export enum ERequestType {
  absence = "Ausencia",
  certification = "Certificación",
  disability = "Incapacidad",
  leave = "Permiso",
  leaving_the_job = "Retiro",
  onboarding = "Vinculación",
  paid_vacations = "Vacaciones Pagadas",
  position_transfer = "Traslado de cargo",
  pqr = "PQR",
  salary_increase = "Ascenso salarial",
  unpaid_leave = "Licencia no remunerada",
  vacations_enjoyed = "Vacaciones Disfrutadas",
}

export interface HumanResourceRequestBlockingPerTask {
  blockType: string;
  description: string;
  errorId: string;
  registrationDate: string;
  taskManagingId: string;
}

export enum TaskNameMapping {
  update_personal_details = "Actualizar datos generales del Empleado",
  update_contact_information = "Actualizar datos de contacto del empleado",
  update_onboarding_information = "Actualizar datos de vinculación",
  health_screening_management = "Gestionar exámenes médicos",
  update_employee_references = "Actualizar referencias del empleado",
  update_compensation_info = "Actualizar asignaciones de la remuneración del empleado",
  manage_signatures = "Gestionar firmas",
  manage_user_accounts_for_office_applications = "Gestionar cuentas de usuario para aplicaciones de oficina",
  manage_social_security_enrollment = "Gestionar Afiliacion a Seguridad Social",
  confirm_start_date = "Confirmar fecha de inicio laboral",
  approve_request = "Aprobar Solicitud",
  verify_viability_of_request = "Verificar viabilidad de la solicitud",
  confirm_vacation_completion = "Confirmar el disfrute de las vacaciones",
  generate_certification = "Generar certificación",
  send_self_registration_invitation_to_email = "Enviar invitacion de autoregistro al correo",
  monitor_completed_registration = "Monitorear registro completado",
}

export const requestTypeMap: Record<ERequestType, string> = {
  [ERequestType.absence]: "absence",
  [ERequestType.certification]: "certification",
  [ERequestType.disability]: "disability",
  [ERequestType.leave]: "leave",
  [ERequestType.leaving_the_job]: "leaving_the_job",
  [ERequestType.onboarding]: "onboarding",
  [ERequestType.paid_vacations]: "paid_vacations",
  [ERequestType.position_transfer]: "position_transfer",
  [ERequestType.pqr]: "pqr",
  [ERequestType.salary_increase]: "salary_increase",
  [ERequestType.unpaid_leave]: "unpaid_leave",
  [ERequestType.vacations_enjoyed]: "vacations_enjoyed",
};

export const requestTypeLabels: Record<ERequestType, string> = {
  [ERequestType.absence]: "Ausencia",
  [ERequestType.certification]: "Certificación",
  [ERequestType.disability]: "Incapacidad",
  [ERequestType.leave]: "Permiso",
  [ERequestType.leaving_the_job]: "Retiro",
  [ERequestType.onboarding]: "Vinculación",
  [ERequestType.paid_vacations]: "Vacaciones Pagadas",
  [ERequestType.position_transfer]: "Traslado de cargo",
  [ERequestType.pqr]: "PQR",
  [ERequestType.salary_increase]: "Ascenso salarial",
  [ERequestType.unpaid_leave]: "Licencia no remunerada",
  [ERequestType.vacations_enjoyed]: "Vacaciones Disfrutadas",
};

export enum ETaskStatus {
  assigned = "Asignada",
  executed = "Ejecutada",
}

export enum HumanResourceRequestStatus {
  closed = "Cerrada",
  rejected = "Rechazada",
  canceled = "Cancelada",
  supervisor_approval = "Aprobación Jefe Inmediato",
  HR_compliance_verification = "Verificación en Gestión Humana",
  confirmation_of_vacation_taken = "Confirmación Disfrute de vacaciones",
  successfully_processed = "Tramitada con Éxito",
  certification_generation = "Generación de la certificación",
  onboarding_in_progress = "Vinculación en Progreso",
}

export enum ERequestStatus {
  canceled = "Cancelado",
  closed = "Cerrado",
  finalized = "Finalizado",
  supervisor_approval = "En progreso",
  rejected = "Rechazado",
}

export interface IUnifiedHumanResourceRequestData {
  contractId: string;
  contractNumber: string;
  businessName: string;
  contractType: string;
  observationEmployee: string;
  daysToPay?: string;
  disbursementDate?: string;
  daysOff?: string;
  startDateEnyoment?: string;
  certificationType?: string;
  addressee?: string;
  motive?: string;
  subMotive?: string;
  motiveDetails?: string;
  startDate?: string;
  daysDuration?: string;
  hoursDuration?: string;
  startTime?: string;
  documents?: {
    title: string;
    required: boolean;
    attachedFiles?: File[];
  }[];
  id?: string;
  identificationNumber?: string;
  names?: string;
  lastNames?: string;
  attachedFile?: File | null;
  normativeFramework?: string;
  endDate?: string;
  company?: string;
  workingShift?: string;
  team?: string;
  position?: string;
  salaryProfile?: string;
  jobMode?: string;
  proyect?: string;
  zonalSegmentation?: string;
  costCenter?: string;
  assignments?: {
    title: string;
    assignment: string;
    value: string;
  }[];
}

export interface HumanResourceRequestTraceability {
  actionExecuted: string;
  description: string;
  executionDate: string;
  humanResourceRequestId: string;
  traceabilityId: string;
  userWhoExecutedAction: string;
}

export interface TaskToManageHumanResourceRequest {
  description: string;
  humanResourceRequestId: string;
  taskCode: string;
  taskManagingId: string;
  taskName: string;
  taskStatus: ETaskStatus;
}

export interface HumanResourceRequest {
  employeeId: string;
  humanResourceRequestData: IUnifiedHumanResourceRequestData;
  humanResourceRequestDate: string;
  humanResourceRequestDescription: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestStatus: HumanResourceRequestStatus;
  humanResourceRequestTraceabilities: HumanResourceRequestTraceability[];
  humanResourceRequestType: ERequestType;
  tasksToManageTheHumanResourcesRequests: TaskToManageHumanResourceRequest[];
  userCodeInCharge: string;
  userNameInCharge: string;
}

export type HumanResourceRequests = HumanResourceRequest[];
