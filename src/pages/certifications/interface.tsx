import { useState } from "react";
import { Button, Stack, Text, Icon } from "@inubekit/inubekit";
import { MdAdd, MdOutlineInfo } from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";
import { InfoModal } from "@components/modals/InfoModal";

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
  hasEnjoymentPrivilege?: boolean;
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
    hasEnjoymentPrivilege = true,
    actionDescriptions = {
      application:
        "No se puede solicitar disfrute de vacaciones, ya que no tiene un contrato activo o no cuenta con los privilegios necesarios.",
    },
    handleDeleteRequest,
  } = props;

  const [infoModal, setInfoModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({
    open: false,
    title: "",
    description: "",
  });

  const onOpenInfoModal = (description: string) => {
    setInfoModal({
      open: true,
      title: "Acción inhabilitada",
      description,
    });
  };

  return (
    <>
      <AppMenu
        appName={appName}
        appDescription={appDescription}
        appRoute={appRoute}
        navigatePage={navigatePage}
      >
        <StyledCertificationsContainer $isMobile={isMobile}>
          <Stack
            gap={spacing.s150}
            justifyContent="space-between"
            width="100%"
            direction={isMobile ? "column" : "row"}
            alignItems="center"
          >
            <Text type="title" size="medium">
              Consulta de certificaciones en trámite
            </Text>
            <Stack gap={spacing.s025} alignItems="center">
              <Button
                spacing="wide"
                variant="filled"
                iconBefore={<MdAdd />}
                type="link"
                path={
                  hasActiveContract && hasEnjoymentPrivilege
                    ? "/certifications/new-certification"
                    : undefined
                }
                fullwidth={isMobile}
                disabled={!hasActiveContract || !hasEnjoymentPrivilege}
              >
                Agregar solicitud
              </Button>
              {(!hasActiveContract || !hasEnjoymentPrivilege) && (
                <Icon
                  icon={<MdOutlineInfo />}
                  appearance="primary"
                  size="16px"
                  cursorHover
                  onClick={() => onOpenInfoModal(actionDescriptions.enjoyment)}
                />
              )}
            </Stack>
          </Stack>
          <CertificationsTable
            data={tableData}
            loading={isLoading}
            hasViewDetailsPrivilege
            hasDeletePrivilege
            handleDeleteRequest={handleDeleteRequest}
          />
        </StyledCertificationsContainer>
      </AppMenu>
      {infoModal.open && (
        <InfoModal
          title={infoModal.title}
          titleDescription="¿Por qué está inhabilitado?"
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
