import { Stack, Text } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import { dataDaysPending } from "./config";
import { usePendingData } from "./interface";
import { PendingUsedDaysTable } from "../PendingUsedDaysTable/index";
import { IPendingUsedDaysTableHeader } from "../PendingUsedDaysTable/types";
import { contractTableHeaders } from "../PendingUsedDaysTable/tableConfig";

interface IDaysPending {
  isMobile: boolean;
  data: { contrato: string; diasPendientes: number }[];
}

export function DaysPending({ isMobile }: IDaysPending) {
  const { totalPendingDays, contractData } = usePendingData();

  const headers: IPendingUsedDaysTableHeader[] = contractTableHeaders;

  return (
    <Stack
      direction="column"
      height={isMobile ? "auto" : "auto"}
      gap={spacing.s200}
    >
      <Stack justifyContent="center" alignItems="center" gap={spacing.s100}>
        <Text type="body" size="medium" appearance="gray">
          {dataDaysPending.title}
        </Text>
        <Text type="title" weight="bold" size="large" appearance="primary">
          {totalPendingDays}
        </Text>
      </Stack>

      <PendingUsedDaysTable
        data={contractData}
        loading={false}
        variant="contract"
        headers={headers}
      />
    </Stack>
  );
}
