import { useState } from "react";
import { Stack, Tabs } from "@inubekit/inubekit";

import { mockDataDaysPending } from "@mocks/mockDataDays/mockData";
import { spacing } from "@design/tokens/spacing";
import {
  mockDataDaysPayment,
  mockDataOpronPayment,
} from "@mocks/mockDataDays/mockDataPayment";
import { BaseModal } from "@components/modals/baseModal";

import { DaysPending } from "./DaysPending";
import { DaysUsed } from "./DaysUsed";
import { dataGuarantee, dataTabs } from "./config";
import { ScrollableContainer } from "./styles";

export interface IOfferedGuaranteeModalProps {
  handleClose: () => void;
  isMobile: boolean;
}

export function OfferedGuaranteeModal(props: IOfferedGuaranteeModalProps) {
  const { handleClose, isMobile } = props;

  const [currentTab, setCurrentTab] = useState(dataTabs[0].id);

  const onChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return (
    <BaseModal
      title={dataGuarantee.title}
      nextButton={dataGuarantee.close}
      handleNext={handleClose}
      handleClose={handleClose}
      width={isMobile ? "auto" : "auto"}
      finalDivider={false}
    >
      <Stack>
        <Tabs selectedTab={currentTab} tabs={dataTabs} onChange={onChange} />
      </Stack>

      <Stack padding={`${spacing.s300} ${spacing.s0}  ${spacing.s0}`}>
        {currentTab === "pending" && (
          <DaysPending isMobile={isMobile} data={mockDataDaysPending} />
        )}
        <ScrollableContainer>
          {currentTab === "used" && (
            <DaysUsed
              isMobile={isMobile}
              paymentData={mockDataDaysPayment}
              opronData={mockDataOpronPayment}
            />
          )}
        </ScrollableContainer>
      </Stack>
    </BaseModal>
  );
}
