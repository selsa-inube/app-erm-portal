interface IOption {
  id: string;
  label: string;
  value: string;
}

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
  status: "pending" | "inProgress" | "completed";
}

interface IMockRequests {
  pending: IRequest[];
  inProgress: IRequest[];
  completed: IRequest[];
}

interface BoardSections {
  sectionTitle: string;
  value: string;
  sectionBackground: "gray" | "light";
  sectionInformation: IRequest[];
}

export type { IOption, IRoute, IRequest, IMockRequests, BoardSections };
