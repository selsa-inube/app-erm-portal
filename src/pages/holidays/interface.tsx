import { useState } from "react";
import { MdAdd, MdOutlineInfo, MdOutlineWarningAmber } from "react-icons/md";
import { Button, Stack, Tabs, ITab, Text, Icon } from "@inubekit/inubekit";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@context/AppContext";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";
import { InfoModal } from "@components/modals/InfoModal";
import { capitalizeWords } from "@utils/text";
import { contractTypeLabels } from "@ptypes/labels.types";
import { useEmployee } from "@hooks/useEmployee";
import { labels } from "@i18n/labels";

import { StyledHolidaysContainer } from "./styles";
import { HolidaysTable } from "./components/HolidaysTable";
import { DaysUsedTable } from "./components/DaysUsedTable";
import { IHolidaysTable } from "./components/HolidaysTable/types";
import { formatVacationHistory } from "./config/table.config";
import { Detail } from "./components/Detail";

interface HolidaysOptionsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  tableData: IHolidaysTable[];
  isLoading: boolean;
  isMobile: boolean;
  appDescription?: string;
  hasActiveContract?: boolean;
  hasEnjoymentPrivilege?: boolean;
  hasPaymentPrivilege?: boolean;
  hasViewDetailsPrivilege?: boolean;
  hasDeletePrivilege?: boolean;
  handleDeleteRequest: (
    requestId: string,
    justification?: string,
  ) => boolean | void;
}

function HolidaysOptionsUI(props: HolidaysOptionsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    tableData,
    isLoading,
    isMobile,
    appDescription,
    hasActiveContract = true,
    hasEnjoymentPrivilege = true,
    hasPaymentPrivilege = true,
    hasViewDetailsPrivilege = true,
    hasDeletePrivilege = true,
    handleDeleteRequest,
  } = props;

  const { selectedEmployee } = useAppContext();
  const navigate = useNavigate();
  const { employee } = useEmployee(selectedEmployee.employeeId);
  const contracts = employee?.employmentContracts ?? [];

  const [selectedTab, setSelectedTab] = useState("dias");

  const [infoModal, setInfoModal] = useState({
    open: false,
    title: labels.holidays.infoModal.disabledActionTitle,
    description: "",
  });

  const actionDescriptions = {
    enjoyment: labels.holidays.privileges.enjoyment,
    payment: labels.holidays.privileges.payment,
  };

  const onOpenInfoModal = (description: string) => {
    setInfoModal({
      open: true,
      title: labels.holidays.infoModal.disabledActionTitle,
      description,
    });
  };

  const tabs: ITab[] = [
    {
      id: "dias",
      label: labels.holidays.tabs.daysUsed,
    },
    {
      id: "solicitudes",
      label: isMobile
        ? labels.holidays.tabs.requestsShort
        : labels.holidays.tabs.requestsLong,
      icon: {
        appearance: "warning",
        icon: <MdOutlineWarningAmber />,
        size: "14px",
      },
    },
  ];

  const renderActions = () =>
    isMobile ? (
      <Detail
        disableEnjoyment={!hasEnjoymentPrivilege || !hasActiveContract}
        disablePayment={!hasPaymentPrivilege || !hasActiveContract}
        actionDescriptions={actionDescriptions}
        hasTableData={tableData.length > 0}
        onRequestEnjoyment={() => {
          if (hasActiveContract && hasEnjoymentPrivilege) {
            navigate("/holidays/request-enjoyment");
          }
        }}
        onRequestPayment={() => {
          if (hasActiveContract && hasPaymentPrivilege) {
            navigate("/holidays/request-payment");
          }
        }}
        onInfoIconClick={(desc) => {
          onOpenInfoModal(desc);
        }}
      />
    ) : (
      <Stack gap={spacing.s150}>
        <Stack gap={spacing.s025} alignItems="center">
          <Button
            iconBefore={<MdAdd />}
            disabled={!hasActiveContract || !hasEnjoymentPrivilege}
            onClick={() => {
              if (hasActiveContract && hasEnjoymentPrivilege) {
                navigate("/holidays/request-enjoyment");
              }
            }}
          >
            {labels.holidays.actions.addEnjoyment}
          </Button>

          {!hasEnjoymentPrivilege && (
            <Icon
              icon={<MdOutlineInfo />}
              appearance="primary"
              size="16px"
              cursorHover
              onClick={() => {
                onOpenInfoModal(actionDescriptions.enjoyment);
              }}
            />
          )}
        </Stack>

        <Stack gap={spacing.s025} alignItems="center">
          <Button
            iconBefore={<MdAdd />}
            disabled={!hasActiveContract || !hasPaymentPrivilege}
            onClick={() => {
              if (hasActiveContract && hasPaymentPrivilege) {
                navigate("/holidays/request-payment");
              }
            }}
          >
            {labels.holidays.actions.addPayment}
          </Button>

          {!hasPaymentPrivilege && (
            <Icon
              icon={<MdOutlineInfo />}
              appearance="primary"
              size="16px"
              cursorHover
              onClick={() => {
                onOpenInfoModal(actionDescriptions.payment);
              }}
            />
          )}
        </Stack>
      </Stack>
    );

  const renderDaysUsedContent = () => (
    <StyledHolidaysContainer $isMobile={isMobile}>
      <Stack alignItems="center" justifyContent="space-between">
        <Text type="title" size="medium">
          {labels.holidays.titles.daysUsedQuery}
        </Text>
        {renderActions()}
      </Stack>

      {contracts.map((contract) => {
        const data = formatVacationHistory([
          { ...selectedEmployee, employmentContracts: [contract] },
        ]);

        return (
          <div key={contract.contractId}>
            {contracts.length > 1 && (
              <Text type="title" size="small" appearance="gray">
                {`${capitalizeWords(contract.businessName)} - ${
                  contractTypeLabels[contract.contractType] ??
                  contract.contractType
                }`}
              </Text>
            )}
            <DaysUsedTable data={data} />
          </div>
        );
      })}
    </StyledHolidaysContainer>
  );

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        {!tableData.length ? (
          renderDaysUsedContent()
        ) : (
          <>
            <Tabs
              tabs={tabs}
              selectedTab={selectedTab}
              onChange={(id) => {
                setSelectedTab(id);
              }}
            />

            {selectedTab === "solicitudes" ? (
              <StyledHolidaysContainer $isMobile={isMobile}>
                <Text type="title" size="medium">
                  {labels.holidays.titles.pendingRequests}
                </Text>

                <HolidaysTable
                  data={tableData}
                  loading={isLoading}
                  hasViewDetailsPrivilege={hasViewDetailsPrivilege}
                  hasDeletePrivilege={hasDeletePrivilege}
                  handleDeleteRequest={(id, justification) => {
                    handleDeleteRequest(id, justification);
                  }}
                />
              </StyledHolidaysContainer>
            ) : (
              renderDaysUsedContent()
            )}
          </>
        )}
      </AppMenu>

      {infoModal.open && (
        <InfoModal
          title={infoModal.title}
          titleDescription={labels.holidays.infoModal.disabledReasonTitle}
          description={infoModal.description}
          onCloseModal={() => {
            setInfoModal({ open: false, title: "", description: "" });
          }}
        />
      )}
    </>
  );
}

export { HolidaysOptionsUI };
