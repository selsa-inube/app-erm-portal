export interface ITraceabilityItem {
  actionExecuted: string;
  description: string;
  executionDate: string;
  transactionOperation: string;
  userWhoExecutedAction: string;
}

export interface IPatchRequestBody {
  humanResourceRequestTraceabilities: ITraceabilityItem[];
}

export interface IPatchHumanResourceResponse {
  success: boolean;
  message?: string;
  humanResourceRequestId?: string;
}
