import { Stack, Text } from "@inubekit/inubekit";
import { spacing } from "@design/tokens/spacing";

import { useAppContext } from "@context/AppContext";

import { dataDaysUsed } from "./config";
import { IDaysUsed } from "./types";
import { useDaysUsedLogic } from "./interface";
import { PendingUsedDaysTable } from "../PendingUsedDaysTable/index";
import { paymentTableHeaders } from "../PendingUsedDaysTable/tableConfig";

export function DaysUsed(props: IDaysUsed) {
  const { isMobile, paymentData, opronData } = props;
  const { selectedEmployee } = useAppContext();

  const { totalPendingDays, paymentTableData, opronTableData } =
    useDaysUsedLogic(paymentData, opronData);

  const headers = paymentTableHeaders;

  const contracts = selectedEmployee?.employmentContracts ?? [];

  if (contracts.length === 0) {
    return <Text>No hay contratos disponibles para este empleado.</Text>;
  }

  const contract = contracts[0];
  const businessName = contract?.businessName ?? "Empresa desconocida";
  const contractType = contract?.contractType ?? "Contrato desconocido";

  return (
    <Stack
      direction="column"
      height={isMobile ? "auto" : "auto"}
      padding={`${spacing.s0} ${spacing.s100} ${spacing.s0} ${spacing.s0}`}
      gap="16px"
    >
      <Stack justifyContent="center" alignItems="center" gap={spacing.s100}>
        <Text type="body" size="medium" appearance="gray">
          {dataDaysUsed.title}
        </Text>
        <Text type="title" weight="bold" size="large" appearance="primary">
          {totalPendingDays}
        </Text>
      </Stack>

      <Stack>
        <Text type="title" size="small" appearance="gray" weight="bold">
          {`${businessName} - ${contractType}`}
        </Text>
      </Stack>

      {contracts.length > 1 ? (
        <>
          <PendingUsedDaysTable
            data={paymentTableData}
            loading={false}
            variant="payment"
            headers={headers}
          />
          <Stack>
            <Text type="title" size="small" appearance="gray" weight="bold">
              {`${businessName} - ${contractType}`}
            </Text>
          </Stack>
          <PendingUsedDaysTable
            data={opronTableData}
            loading={false}
            variant="payment"
            headers={headers}
          />
        </>
      ) : (
        <PendingUsedDaysTable
          data={paymentTableData}
          loading={false}
          variant="payment"
          headers={headers}
        />
      )}
    </Stack>
  );
}
