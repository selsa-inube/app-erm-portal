import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  MdOutlineBeachAccess,
  MdOutlineChevronRight,
  MdOutlineNotificationImportant,
  MdOutlinePersonOff,
} from "react-icons/md";
import {
  Text,
  Icon,
  Stack,
  Grid,
  Header,
  useMediaQuery,
} from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { AppCard } from "@components/feedback/AppCard";
import { AlertModal } from "@components/modals/AlertModal";
import { AbsenceDetailModal } from "@components/modals/AbsenceDetailModal";

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
    lastAbsenceDateRange,
    toggleAbsenceDetailModal,
    isAbsenceDetailOpen,
    absences,
  } = useHome();

  const isTablet = useMediaQuery("(max-width: 944px)");
  const finalLogo = businessManager?.urlLogo ?? logoUrl;

  const headerUsername = staffUser
    ? `${staffUser.staffName} ${staffUser.staffLastName ?? ""}`
    : labels.home.header.defaultUsername;

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const toggleAlertModal = () => setIsAlertModalOpen(!isAlertModalOpen);

  const alertEvents = employeeAlertsMock.map((alert) => ({
    dateAndTime: alert.date,
    title: alert.title,
    message: alert.description,
  }));

  return (
    <StyledAppPage>
      <Grid templateRows="auto auto" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            selectedClient?.logo ?? logoUrl,
            selectedClient?.name ?? labels.home.header.noUnitSelected,
          )}
          user={{
            username: headerUsername,
            client: selectedClient?.name ?? labels.home.header.noUnitSelected,
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
                  : labels.home.banner.noEmployeeSelected
              }
              status={
                selectedEmployee
                  ? selectedEmployee.employeeStatus
                  : labels.home.banner.unknownStatus
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
                  label: labels.home.banner.pendingDays,
                  onClick: toggleModal,
                },
              ]}
              absenceItems={
                lastAbsenceDateRange
                  ? [
                      {
                        icon: (
                          <Icon
                            icon={<MdOutlinePersonOff />}
                            appearance="primary"
                            size="24px"
                            cursorHover
                          />
                        ),
                        label: labels.home.banner.absences,
                        value: lastAbsenceDateRange,
                        onClick: toggleAbsenceDetailModal,
                      },
                    ]
                  : []
              }
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
                        value:
                          employeeAlertsMock.length > 99
                            ? "+99"
                            : employeeAlertsMock.length,
                        label: labels.home.banner.alerts,
                        onClick: toggleAlertModal,
                      },
                    ]
                  : []
              }
              seniorityItems={[
                {
                  value: 2.5,
                  unit: labels.home.banner.years,
                  label: labels.home.banner.seniority,
                },
              ]}
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
                  {labels.home.main.welcome},{" "}
                  {user?.username ?? labels.home.main.defaultUser}
                </Text>
                <Text
                  type="title"
                  appearance="gray"
                  size={isTablet ? "medium" : "large"}
                >
                  {labels.home.main.subtitle}
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

      {isAlertModalOpen && (
        <AlertModal
          handleClose={toggleAlertModal}
          title={labels.home.modals.alertsTitle}
          events={alertEvents}
        />
      )}

      {isAbsenceDetailOpen && (
        <AbsenceDetailModal
          title={labels.home.modals.absenceDetailTitle}
          buttonLabel={labels.home.modals.closeButton}
          details={absences}
          onClose={toggleAbsenceDetailModal}
        />
      )}
    </StyledAppPage>
  );
}

export { Home };
