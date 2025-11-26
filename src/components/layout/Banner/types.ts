export interface InfoItemProps {
  icon: JSX.Element;
  value: number | string;
  label: string;
  onClick?: () => void;
}

export interface EmployeeSeniorityItemProps {
  value: number | string;
  unit?: string;
  label?: string;
}
