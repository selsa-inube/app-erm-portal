import { HolidayTypes } from "@ptypes/holidays.types";
import { IPendingUsedDaysTable } from "./types";

export function useDaysUsedLogic(
  data: { startDate: string; usageMode: string; days: number }[],
) {
  const totalPendingDays = data.reduce((total, item) => total + item.days, 0);

  const tableData: IPendingUsedDaysTable[] = data.map((item) => ({
    startDate: { value: item.startDate },
    usageMode: {
      value: HolidayTypes[item.usageMode as keyof typeof HolidayTypes],
    },
    days: { value: item.days },
  }));

  return { totalPendingDays, tableData };
}
