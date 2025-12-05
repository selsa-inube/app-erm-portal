import { useState } from "react";
import { Button, Stack, Text, Icon } from "@inubekit/inubekit";
import { MdAdd, MdOutlineInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { labels } from "@i18n/labels";
import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";
import { InfoModal } from "@components/modals/InfoModal";
import { useAppContext } from "@context/AppContext/useAppContext";

import { Detail } from "./components/CertificationsTable/Detail";
import { StyledCertificationsContainer } from "./styles";
import { CertificationsTable } from "./components/CertificationsTable";
import { ICertificationsTable } from "./components/CertificationsTable/types";

interface CertificationsOptionsUIProps {
  appName: string;
  appRoute: IRoute[];
  navigatePage: string;
  tableData: ICertificationsTable[];
  isLoading: boolean;
  isMobile: boolean;
  appDescription?: string;
  hasActiveContract?: boolean;
  hasPrivilege?: boolean;
  hasPaymentPrivilege?: boolean;
  actionDescriptions?: Record<string, string>;
  handleDeleteRequest: (requestId: string, justification: string) => void;
}

function CertificationsOptionsUI(props: CertificationsOptionsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    tableData,
    isMobile,
    isLoading,
    appDescription,
    hasActiveContract = true,
    actionDescriptions = {
      enjoyment: labels.certifications.infoModal.defaultDescription,
    },
    handleDeleteRequest,
  } = props;

  const navigate = useNavigate();
  const { staffUseCasesData } = useAppContext();

  const hasRequestCertificatePrivilege =
    Array.isArray(staffUseCasesData?.listOfUseCases) &&
    staffUseCasesData.listOfUseCases.includes("RequestCertificate");

  const canRequestCertificate =
    hasActiveContract && hasRequestCertificatePrivilege;

  const [infoModal, setInfoModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({
    open: false,
    title: "",
    description: "",
  });

  const addRequest = (): void => {
    void navigate("/certifications/new-certification");
  };

  const onOpenInfoModal = (description: string) => {
    setInfoModal({
      open: true,
      title: labels.certifications.infoModal.title,
      description,
    });
  };

  const renderActions = () =>
    isMobile ? (
      <Detail
        disableEnjoyment={!canRequestCertificate}
        actionDescriptions={actionDescriptions}
        onRequestEnjoyment={
          canRequestCertificate ? () => addRequest() : undefined
        }
        onInfoIconClick={onOpenInfoModal}
      />
    ) : (
      <Stack gap={spacing.s150} justifyContent="end">
        <Stack gap={spacing.s025} alignItems="center">
          <Button
            spacing="wide"
            variant="filled"
            iconBefore={<MdAdd />}
            fullwidth={isMobile}
            disabled={!canRequestCertificate}
            onClick={canRequestCertificate ? () => addRequest() : undefined}
          >
            {labels.certifications.buttons.addRequest}
          </Button>
          {!canRequestCertificate && (
            <Icon
              icon={<MdOutlineInfo />}
              appearance="primary"
              size="16px"
              cursorHover
              onClick={() =>
                onOpenInfoModal(
                  actionDescriptions.enjoyment ??
                    labels.certifications.infoModal.defaultDescription,
                )
              }
            />
          )}
        </Stack>
      </Stack>
    );

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <StyledCertificationsContainer $isMobile={isMobile}>
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="title" size="medium">
              {labels.certifications.titles.page}
            </Text>
            {renderActions()}
          </Stack>
          <CertificationsTable
            data={tableData}
            loading={isLoading}
            hasDeletePrivilege
            hasViewDetailsPrivilege
            handleDeleteRequest={handleDeleteRequest}
          />
        </StyledCertificationsContainer>
      </AppMenu>
      {infoModal.open && (
        <InfoModal
          title={infoModal.title}
          titleDescription={labels.certifications.infoModal.titleDescription}
          description={infoModal.description}
          onCloseModal={() =>
            setInfoModal({ open: false, title: "", description: "" })
          }
        />
      )}
    </>
  );
}

export { CertificationsOptionsUI };
