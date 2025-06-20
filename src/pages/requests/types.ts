interface IRoute {
  path: string;
  label: string;
  id: string;
  isActive?: boolean;
  size?: "large" | "small";
}

interface IRequest {
  id: string;
  title: string;
  requestDate: string;
  responsible: string;
  hasResponsible: boolean;
  status: "pending" | "supervisor_approval" | "completed";
}

interface IMockRequests {
  pending: IRequest[];
  supervisor_approval: IRequest[];
  completed: IRequest[];
}

interface BoardSections {
  sectionTitle: string;
  value: string;
  sectionBackground: "gray" | "light";
  sectionInformation: IRequest[];
}

interface RequestItem {
  id: string;
  title: string;
  requestDate: string;
  responsible: string;
  hasResponsible?: boolean;
  status: string;
}

type Status = "pending" | "supervisor_approval" | "completed";

export type {
  IRoute,
  IRequest,
  IMockRequests,
  BoardSections,
  Status,
  RequestItem,
};
