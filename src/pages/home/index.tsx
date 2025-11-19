import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  MdOutlineBeachAccess,
  MdOutlineChevronRight,
  MdOutlineNotificationImportant,
} from "react-icons/md";
import {
  Text,
  Icon,
  Stack,
  Grid,
  Header,
  useMediaQuery,
} from "@inubekit/inubekit";

import { AppCard } from "@components/feedback/AppCard";
import { employeeAlertsMock } from "@mocks/employeeAlerts/employeeAlerts.mock";
import { spacing } from "@design/tokens/spacing";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange";
import { userMenu } from "@config/nav.config";
import { VinculationBanner } from "@components/layout/Banner";
import { OfferedGuaranteeModal } from "@components/modals/OfferedGuaranteeModal";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledQuickAccessContainer,
  StyledCollapseIcon,
  StyledCollapse,
  StyledFinalLogo,
  StyledFooter,
} from "./styles";
import { useHome } from "./interface";

const renderLogo = (imgUrl: string, altText: string) => (
  <StyledContentImg to="/">
    <StyledLogo src={imgUrl} alt={altText} />
  </StyledContentImg>
);

function Home() {
  const {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    selectedEmployee,
    configHeader,
    collapse,
    staffUser,
    setCollapse,
    businessManager,
    isModalOpen,
    toggleModal,
    collapseMenuRef,
    businessUnitChangeRef,
    dataOptions,
    totalDays,
    loadingDays,
    handleLogoClick,
    showBusinessUnitSelector,
  } = useHome();

  const isTablet = useMediaQuery("(max-width: 944px)");
  const finalLogo = businessManager?.urlLogo ?? logoUrl;

  const headerUsername = staffUser
    ? `${staffUser.staffName} ${staffUser.staffLastName ?? ""}`
    : "Nombre de usuario";

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const toggleAlertModal = () => setIsAlertModalOpen(!isAlertModalOpen);

  return (
    <StyledAppPage>
      <Grid templateRows="auto auto" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            selectedClient?.logo ?? logoUrl,
            selectedClient?.name ?? "Sin unidad seleccionada",
          )}
          user={{
            username: headerUsername,
            client: selectedClient?.name ?? "Sin unidad seleccionada",
            breakpoint: "800px",
          }}
          menu={userMenu}
        />

        {showBusinessUnitSelector && (
          <StyledCollapseIcon
            $collapse={collapse}
            ref={collapseMenuRef}
            $isTablet={isTablet}
            onClick={() => setCollapse(!collapse)}
          >
            <Icon
              icon={<MdOutlineChevronRight />}
              appearance="primary"
              size="24px"
              cursorHover
            />
          </StyledCollapseIcon>
        )}

        {collapse && showBusinessUnitSelector && (
          <StyledCollapse ref={businessUnitChangeRef}>
            <BusinessUnitChange
              businessUnits={businessUnits}
              selectedClient={selectedClient?.name ?? ""}
              onLogoClick={handleLogoClick}
            />
          </StyledCollapse>
        )}

        <StyledContainer>
          <Stack
            padding={`${isTablet ? spacing.s100 : spacing.s400} ${
              isTablet ? spacing.s200 : spacing.s800
            } ${isTablet ? spacing.s400 : spacing.s200}`}
            justifyContent="center"
          >
            <VinculationBanner
              key={
                selectedEmployee ? selectedEmployee.employeeId : "no-employee"
              }
              name={
                selectedEmployee
                  ? `${selectedEmployee.names} ${selectedEmployee.surnames}`
                  : "Empleado no seleccionado"
              }
              status={
                selectedEmployee
                  ? selectedEmployee.employeeStatus
                  : "estado-desconocido"
              }
              imageUrl={logoUrl}
              redirectUrl="/employees/select-employee"
              infoItems={[
                {
                  icon: (
                    <Icon
                      icon={<MdOutlineBeachAccess />}
                      appearance="primary"
                      size="24px"
                      cursorHover
                    />
                  ),
                  value: totalDays,
                  label: "Días pendientes",
                  onClick: toggleModal,
                },
              ]}
              alertItems={
                employeeAlertsMock.length > 0
                  ? [
                      {
                        icon: (
                          <Icon
                            icon={<MdOutlineNotificationImportant />}
                            appearance="primary"
                            size="24px"
                            cursorHover
                          />
                        ),
                        value: employeeAlertsMock.length,
                        label: "Alertas",
                        onClick: toggleAlertModal,
                      },
                    ]
                  : []
              }
              isLoading={loadingDays}
              expandedWidth
            />
          </Stack>

          <StyledMain $isTablet={isTablet}>
            <Grid
              templateColumns={isTablet ? "1fr" : "auto 1fr"}
              alignItems="start"
            >
              <Stack gap={spacing.s300} direction="column">
                <Text size={isTablet ? "medium" : "large"} type="headline">
                  Bienvenido(a), {user?.username ?? "Usuario"}
                </Text>
                <Text
                  type="title"
                  appearance="gray"
                  size={isTablet ? "medium" : "large"}
                >
                  Aquí tienes las funcionalidades disponibles.
                </Text>

                <StyledQuickAccessContainer $isTablet={isTablet}>
                  {dataOptions?.map(
                    (link, index) =>
                      link.isEnabled && (
                        <AppCard
                          key={index}
                          title={link.label}
                          description={link.description}
                          icon={link.icon}
                          url={link.path}
                        />
                      ),
                  )}
                </StyledQuickAccessContainer>
              </Stack>
            </Grid>
            <Outlet />
          </StyledMain>
        </StyledContainer>
      </Grid>

      <StyledFooter>
        <Stack alignItems="center" gap={spacing.s050}>
          <Text as="span" size="small" appearance="gray">
            ®
          </Text>
          <StyledFinalLogo src={finalLogo} />
        </Stack>
      </StyledFooter>

      {isModalOpen && (
        <OfferedGuaranteeModal handleClose={toggleModal} isMobile={isTablet} />
      )}
    </StyledAppPage>
  );
}

export { Home };
