import { IPendingUsedDaysTable } from "./types";

export function useDaysUsedLogic(
  paymentData: { startDate: string; usageMode: string; days: number }[],
  opronData: { startDate: string; usageMode: string; days: number }[],
) {
  const totalPendingDays = [...paymentData, ...opronData].reduce(
    (total, item) => total + item.days,
    0,
  );

  const paymentTableData: IPendingUsedDaysTable[] = paymentData.map((item) => ({
    startDate: { value: item.startDate },
    usageMode: { value: item.usageMode },
    days: { value: item.days },
  }));

  const opronTableData: IPendingUsedDaysTable[] = opronData.map((item) => ({
    startDate: { value: item.startDate },
    usageMode: { value: item.usageMode },
    days: { value: item.days },
  }));

  return { totalPendingDays, paymentTableData, opronTableData };
}
