import { IPendingUsedDaysTable } from "./types";

export function useDaysUsedLogic(
  data: { startDate: string; usageMode: string; days: number }[],
) {
  console.log("Datos recibidos para la suma de días:", data);

  const totalPendingDays = data.reduce((total, item) => total + item.days, 0);

  const tableData: IPendingUsedDaysTable[] = data.map((item) => ({
    startDate: { value: item.startDate },
    usageMode: { value: item.usageMode },
    days: { value: item.days },
  }));

  return { totalPendingDays, tableData };
}
