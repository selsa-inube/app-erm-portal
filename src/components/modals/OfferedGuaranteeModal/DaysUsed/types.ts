export interface IDaysUsed {
  isMobile: boolean;
  data: { startDate: string; usageMode: string; days: number }[];
}

export interface IPendingUsedDaysTable {
  [key: string]: {
    value: string | number;
  };
  startDate: { value: string };
  usageMode: { value: string };
  days: { value: number };
}

export interface IPendingUsedDaysTableHeader {
  label: string;
  key: string;
}
