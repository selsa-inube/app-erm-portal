export interface PendingUsedDaysTable<T> {
  value: T;
}

export type IPendingUsedDaysTable = Record<
  string,
  PendingUsedDaysTable<string | number | JSX.Element>
>;

export interface IPendingUsedDaysTableHeader {
  key: string;
  label: string;
  action?: () => void;
  style?: React.CSSProperties;
}

export interface IPendingUsedDaysTableColumn {
  span: number;
  style?: React.CSSProperties;
}
