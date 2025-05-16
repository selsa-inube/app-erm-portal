export interface IDaysUsed {
  isMobile: boolean;
  paymentData: { startDate: string; usageMode: string; days: number }[];
  opronData: { startDate: string; usageMode: string; days: number }[];
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
