import { Stack, Text, SkeletonIcon } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";
import { useEmployeeVacationDays } from "@hooks/useEmployeeVacationDays";
import { useAppContext } from "@context/AppContext";
import { capitalizeWords } from "@utils/text";
import { labels } from "@i18n/labels";

import { PendingUsedDaysTable } from "../PendingUsedDaysTable/index";
import { IPendingUsedDaysTableHeader } from "../PendingUsedDaysTable/types";
import { contractTableHeaders } from "../PendingUsedDaysTable/tableConfig";

interface IDaysPending {
  isMobile: boolean;
}

export function DaysPending({ isMobile }: IDaysPending) {
  const { selectedEmployee } = useAppContext();
  const { vacationDays, loadingDays } = useEmployeeVacationDays(
    selectedEmployee.employeeId,
  );

  const headers: IPendingUsedDaysTableHeader[] = contractTableHeaders;

  const contractData =
    vacationDays?.map((item) => ({
      contract: { value: capitalizeWords(item.businessName) },
      pendingDays: { value: item.pendingDays },
    })) ?? [];

  const totalDays =
    vacationDays?.reduce((sum, contract) => sum + contract.pendingDays, 0) ?? 0;

  return (
    <Stack
      direction="column"
      height={isMobile ? "auto" : "auto"}
      gap={spacing.s200}
    >
      <Stack justifyContent="center" alignItems="center" gap={spacing.s100}>
        <Text type="body" size="medium" appearance="gray">
          {labels.modal.dataDaysPending.title}
        </Text>

        {loadingDays ? (
          <SkeletonIcon animated />
        ) : (
          <Text type="title" weight="bold" size="large" appearance="primary">
            {totalDays}
          </Text>
        )}
      </Stack>

      <PendingUsedDaysTable
        data={contractData}
        loading={loadingDays}
        variant="contract"
        headers={headers}
      />
    </Stack>
  );
}
