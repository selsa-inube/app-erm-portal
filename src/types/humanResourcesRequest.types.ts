export enum ERequestType {
  Absence = "Ausencia",
  Certification = "Certificación",
  Disability = "Incapacidad",
  Leave = "Permiso",
  LeavingTheJob = "Retiro",
  Onboarding = "Vinculación",
  PaidVacations = "Vacaciones Pagadas",
  PositionTransfer = "Traslado de cargo",
  PQR = "PQR",
  SalaryIncrease = "Ascenso salarial",
  UnpaidLeave = "Licencia no remunerada",
  VacationsEnjoyed = "Vacaciones Disfrutadas",
}

export enum ETaskStatus {
  Assigned = "Asignada",
  Executed = "Ejecutada",
}

export enum ERequestStatus {
  Canceled = "Cancelado",
  Closed = "Cerrado",
  Finished = "Finalizado",
  InProgress = "En progreso",
  Rejected = "Rechazado",
}

export interface IGeneralInformationEntry {
  id: string;
  startDate: string;
  contract: string;
  observations: string;
  contractId: string;
  contractNumber: string;
  businessName: string;
  contractType: string;
  observationEmployee: string;
  certification: string;
  contractDesc: string;
}

export interface IVacationEnjoyedData extends IGeneralInformationEntry {
  daysOff: string;
  startDateEnyoment: string;
}

export interface IVacationPaymentData extends IGeneralInformationEntry {
  daysToPay: string;
  disbursementDate: string;
}

export interface ICertificationData extends IGeneralInformationEntry {
  certificationType: string;
  addressee: string;
}

export type HumanResourceRequestData =
  | IVacationEnjoyedData
  | IVacationPaymentData
  | ICertificationData;

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
  humanResourceRequestData: HumanResourceRequestData;
  humanResourceRequestDate: string;
  humanResourceRequestDescription: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestStatus: ERequestStatus;
  humanResourceRequestTraceabilities: HumanResourceRequestTraceability[];
  humanResourceRequestType: ERequestType;
  tasksToManageTheHumanResourcesRequests: TaskToManageHumanResourceRequest[];
  userCodeInCharge: string;
  userNameInCharge: string;
}

export type HumanResourceRequests = HumanResourceRequest[];
