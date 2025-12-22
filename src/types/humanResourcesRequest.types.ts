import { labels } from "@i18n/labels";

export const ERequestType = {
  absence: labels.types.requestTypes.absence,
  certification: labels.types.requestTypes.certification,
  disability: labels.types.requestTypes.disability,
  leave: labels.types.requestTypes.leave,
  leaving_the_job: labels.types.requestTypes.leaving_the_job,
  onboarding: labels.types.requestTypes.onboarding,
  paid_vacations: labels.types.requestTypes.paid_vacations,
  position_transfer: labels.types.requestTypes.position_transfer,
  pqr: labels.types.requestTypes.pqr,
  salary_increase: labels.types.requestTypes.salary_increase,
  unpaid_leave: labels.types.requestTypes.unpaid_leave,
  vacations_enjoyed: labels.types.requestTypes.vacations_enjoyed,
} as const;

export type ERequestType = (typeof ERequestType)[keyof typeof ERequestType];

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
  [ERequestType.absence]: labels.types.requestTypes.absence,
  [ERequestType.certification]: labels.types.requestTypes.certification,
  [ERequestType.disability]: labels.types.requestTypes.disability,
  [ERequestType.leave]: labels.types.requestTypes.leave,
  [ERequestType.leaving_the_job]: labels.types.requestTypes.leaving_the_job,
  [ERequestType.onboarding]: labels.types.requestTypes.onboarding,
  [ERequestType.paid_vacations]: labels.types.requestTypes.paid_vacations,
  [ERequestType.position_transfer]: labels.types.requestTypes.position_transfer,
  [ERequestType.pqr]: labels.types.requestTypes.pqr,
  [ERequestType.salary_increase]: labels.types.requestTypes.salary_increase,
  [ERequestType.unpaid_leave]: labels.types.requestTypes.unpaid_leave,
  [ERequestType.vacations_enjoyed]: labels.types.requestTypes.vacations_enjoyed,
};

export const TaskNameMapping = {
  update_personal_details: labels.types.taskNames.update_personal_details,
  update_contact_information: labels.types.taskNames.update_contact_information,
  update_onboarding_information:
    labels.types.taskNames.update_onboarding_information,
  health_screening_management:
    labels.types.taskNames.health_screening_management,
  update_employee_references: labels.types.taskNames.update_employee_references,
  update_compensation_info: labels.types.taskNames.update_compensation_info,
  manage_signatures: labels.types.taskNames.manage_signatures,
  manage_user_accounts_for_office_applications:
    labels.types.taskNames.manage_user_accounts_for_office_applications,
  manage_social_security_enrollment:
    labels.types.taskNames.manage_social_security_enrollment,
  confirm_start_date: labels.types.taskNames.confirm_start_date,
  approve_request: labels.types.taskNames.approve_request,
  verify_viability_of_request:
    labels.types.taskNames.verify_viability_of_request,
  confirm_vacation_completion:
    labels.types.taskNames.confirm_vacation_completion,
  generate_certification: labels.types.taskNames.generate_certification,
  send_self_registration_invitation_to_email:
    labels.types.taskNames.send_self_registration_invitation_to_email,
  monitor_completed_registration:
    labels.types.taskNames.monitor_completed_registration,
} as const;

export type TaskNameMapping =
  (typeof TaskNameMapping)[keyof typeof TaskNameMapping];

export const ETaskStatus = {
  assigned: labels.types.taskStatus.assigned,
  executed: labels.types.taskStatus.executed,
} as const;

export type ETaskStatus = (typeof ETaskStatus)[keyof typeof ETaskStatus];

export const HumanResourceRequestStatus = {
  closed: labels.types.requestStatus.closed,
  rejected: labels.types.requestStatus.rejected,
  canceled: labels.types.requestStatus.canceled,
  supervisor_approval: labels.types.requestStatus.supervisor_approval,
  HR_compliance_verification:
    labels.types.requestStatus.HR_compliance_verification,
  confirmation_of_vacation_taken:
    labels.types.requestStatus.confirmation_of_vacation_taken,
  successfully_processed: labels.types.requestStatus.successfully_processed,
  certification_generation: labels.types.requestStatus.certification_generation,
  onboarding_in_progress: labels.types.requestStatus.onboarding_in_progress,
} as const;

export type HumanResourceRequestStatus =
  (typeof HumanResourceRequestStatus)[keyof typeof HumanResourceRequestStatus];

export const ERequestStatus = {
  canceled: labels.types.simpleRequestStatus.canceled,
  closed: labels.types.simpleRequestStatus.closed,
  finalized: labels.types.simpleRequestStatus.finalized,
  supervisor_approval: labels.types.simpleRequestStatus.supervisor_approval,
  rejected: labels.types.simpleRequestStatus.rejected,
} as const;

export type ERequestStatus =
  (typeof ERequestStatus)[keyof typeof ERequestStatus];

export interface HumanResourceRequestBlockingPerTask {
  blockType: string;
  description: string;
  errorId: string;
  registrationDate: string;
  taskManagingId: string;
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
  taskName: TaskNameMapping;
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
