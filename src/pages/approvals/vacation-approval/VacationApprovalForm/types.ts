const ApprovalOptions = {
  APPROVE: "approve_the_Request",
  REJECT: "reject_the_request_as_unfeasible",
} as const;

const VacationTypes = {
  PAID: "paid_vacations",
} as const;

interface IFormValues {
  approval: string;
  observation: string;
}

export { ApprovalOptions, VacationTypes };
export type { IFormValues };
