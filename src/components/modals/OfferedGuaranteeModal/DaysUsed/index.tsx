import { Stack, Text } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

import { useAppContext } from "@context/AppContext";
import { formatDate } from "@utils/date";
import { capitalizeWords } from "@utils/text";
import { contractTypeLabels } from "@mocks/contracts/enums";

import { PendingUsedDaysTable } from "../PendingUsedDaysTable";
import { paymentTableHeaders } from "../PendingUsedDaysTable/tableConfig";
import { useDaysUsedLogic } from "./interface";

export function DaysUsed({ isMobile }: { isMobile: boolean }) {
  const { selectedEmployee } = useAppContext();

  if (!selectedEmployee) {
    return <Text>No hay empleado seleccionado.</Text>;
  }

  const contracts = selectedEmployee.employmentContracts ?? [];

  if (contracts.length === 0) {
    return <Text>No hay contratos disponibles para este empleado.</Text>;
  }

  const allVacations = contracts.flatMap((contract) =>
    contract.vacationsHistory.map((vacation) => ({
      startDate: formatDate(vacation.startDateVacationEnjoyment),
      usageMode: vacation.vacationType,
      days: vacation.businessDaysOfVacation + vacation.nonWorkingDaysOfVacation,
    })),
  );

  const { totalPendingDays, tableData } = useDaysUsedLogic(allVacations);

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
                {`${capitalizeWords(businessName)} - ${contractTypeLabels[contractType]}`}
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
