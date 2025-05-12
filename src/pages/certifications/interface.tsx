import { Button, Stack, Text } from "@inubekit/inubekit";
import { MdAdd } from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { IRoute } from "@components/layout/AppMenu/types";
import { spacing } from "@design/tokens/spacing";

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
  handleDeleteRequest: (requestId: string, justification: string) => void;
}

function CertificationsOptionsUI(props: CertificationsOptionsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    appDescription,
    tableData,
    isMobile,
    isLoading,
    handleDeleteRequest,
  } = props;

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
            <Button
              spacing="wide"
              variant="filled"
              iconBefore={<MdAdd />}
              type="link"
              path="/certifications/new-certification"
              fullwidth={isMobile}
            >
              Nueva solicitud
            </Button>
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
    </>
  );
}

export { CertificationsOptionsUI };
