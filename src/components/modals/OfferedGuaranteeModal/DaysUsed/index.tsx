import { Stack, Text } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

import { useAppContext } from "@context/AppContext";
import { formatVacationHistory } from "@pages/holidays/config/table.config";

import { PendingUsedDaysTable } from "../PendingUsedDaysTable/index";
import { paymentTableHeaders } from "../PendingUsedDaysTable/tableConfig";
import { useDaysUsedLogic } from "./interface";

export function DaysUsed(props: { isMobile: boolean }) {
  const { isMobile } = props;
  const { selectedEmployee } = useAppContext();

  if (!selectedEmployee) {
    return <Text>No hay empleado seleccionado.</Text>;
  }

  const contracts = selectedEmployee.employmentContracts ?? [];

  if (contracts.length === 0) {
    return <Text>No hay contratos disponibles para este empleado.</Text>;
  }

  const formattedVacations = formatVacationHistory([selectedEmployee]);

  const { totalPendingDays, tableData } = useDaysUsedLogic(
    formattedVacations.map(({ startDate, usageMode, days }) => ({
      startDate: startDate.value,
      usageMode: usageMode.value,
      days: Number(days.value),
    })),
  );

  return (
    <Stack
      direction="column"
      height={isMobile ? "auto" : "auto"}
      padding={`${spacing.s0} ${spacing.s100} ${spacing.s0} ${spacing.s0}`}
      gap="16px"
    >
      <Stack justifyContent="center" alignItems="center" gap={spacing.s100}>
        <Text type="body" size="medium" appearance="gray">
          Vacaciones utilizadas
        </Text>
        <Text type="title" weight="bold" size="large" appearance="primary">
          {totalPendingDays}
        </Text>
      </Stack>

      {contracts.map((contract, index) => {
        const businessName = contract.businessName ?? "Empresa desconocida";
        const contractType = contract.contractType ?? "Contrato desconocido";

        return (
          <Stack key={index} direction="column" gap="8px">
            {contracts.length > 1 && (
              <Text type="title" size="small" appearance="gray" weight="bold">
                {`${businessName} - ${contractType}`}
              </Text>
            )}

            <PendingUsedDaysTable
              data={tableData}
              loading={false}
              variant="payment"
              headers={paymentTableHeaders}
            />
          </Stack>
        );
      })}
    </Stack>
  );
}
