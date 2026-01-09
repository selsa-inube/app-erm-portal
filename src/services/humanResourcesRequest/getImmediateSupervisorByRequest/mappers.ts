export interface ImmediateSupervisorByRequest {
  daysRequested: number;
  employeeId: string;
  employeeName: string;
  employeeSurname: string;
  humanResourceRequestId: string;
  humanResourceRequestNumber: string;
  humanResourceRequestType: string;
  identificationDocumentNumber: string;
  identificationType: string;
  leadEmployeeId: string;
  leadEmployeeIdentificationDocumentNumber: string;
  leadEmployeeIdentificationType: string;
  leadEmployeeName: string;
  leadEmployeeSurname: string;
  periodFrom: string;
  periodTo: string;
  taskCode: string;
  taskManagingId: string;
  taskName: string;
}

const mapImmediateSupervisorByRequestApiToEntity = (
  item: Partial<ImmediateSupervisorByRequest>,
): ImmediateSupervisorByRequest => ({
  daysRequested: Number(item.daysRequested ?? 0),
  employeeId: String(item.employeeId ?? ""),
  employeeName: String(item.employeeName ?? ""),
  employeeSurname: String(item.employeeSurname ?? ""),
  humanResourceRequestId: String(item.humanResourceRequestId ?? ""),
  humanResourceRequestNumber: String(item.humanResourceRequestNumber ?? ""),
  humanResourceRequestType: String(item.humanResourceRequestType ?? ""),
  identificationDocumentNumber: String(item.identificationDocumentNumber ?? ""),
  identificationType: String(item.identificationType ?? ""),
  leadEmployeeId: String(item.leadEmployeeId ?? ""),
  leadEmployeeIdentificationDocumentNumber: String(
    item.leadEmployeeIdentificationDocumentNumber ?? "",
  ),
  leadEmployeeIdentificationType: String(
    item.leadEmployeeIdentificationType ?? "",
  ),
  leadEmployeeName: String(item.leadEmployeeName ?? ""),
  leadEmployeeSurname: String(item.leadEmployeeSurname ?? ""),
  periodFrom: String(item.periodFrom ?? ""),
  periodTo: String(item.periodTo ?? ""),
  taskCode: String(item.taskCode ?? ""),
  taskManagingId: String(item.taskManagingId ?? ""),
  taskName: String(item.taskName ?? ""),
});

export { mapImmediateSupervisorByRequestApiToEntity };
