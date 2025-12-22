import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Nav,
  Grid,
  Header,
  useMediaQuery,
  Icon,
  Text,
  Stack,
} from "@inubekit/inubekit";
import {
  MdOutlineChevronRight,
  MdOutlineBeachAccess,
  MdOutlinePersonOff,
  MdOutlineNotificationImportant,
} from "react-icons/md";

import {
  useNavConfig,
  userMenu,
  actions,
  useConfigHeader,
} from "@config/nav.config";
import { useAppContext } from "@context/AppContext/useAppContext";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";
import { VinculationBanner } from "@components/layout/Banner";
import { spacing } from "@design/tokens/spacing";
import { employeeAlertsMock } from "@mocks/employeeAlerts/employeeAlerts.mock";
import { AlertModal } from "@components/modals/AlertModal";
import { OfferedGuaranteeModal } from "@components/modals/OfferedGuaranteeModal";
import { useEmployeeVacationDays } from "@hooks/useEmployeeVacationDays";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import { AbsenceDetailModal } from "@components/modals/AbsenceDetailModal";
import {
  AbsenceReasonES,
  ESubReasonES,
  ESubReason,
} from "@ptypes/employeeAbsence.types";
import { useEmployeeAbsences } from "@hooks/useEmployeeAbsences";
import { formatDateRange } from "@utils/date";
import { labels } from "@i18n/labels";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledCollapseIcon,
  StyledCollapse,
  StyledMainScroll,
  StyledFinalLogo,
  StyledFooter,
} from "./styles";

interface AppPageProps {
  withNav?: boolean;
  withBanner?: boolean;
  fullWidth?: boolean;
}

const renderLogo = (
  imgUrl: string,
  clientName: string,
  selectedEmployee: Employee,
) => {
  const redirectTo = selectedEmployee ? "/" : "/employees/select-employee";

  return imgUrl ? (
    <StyledContentImg to={redirectTo}>
      <StyledLogo src={imgUrl} alt={clientName} />
    </StyledContentImg>
  ) : (
    <StyledContentImg to={redirectTo}>{clientName}</StyledContentImg>
  );
};

function AppPage(props: AppPageProps) {
  const { withNav = true, withBanner = true, fullWidth = false } = props;

  const {
    logoUrl,
    selectedClient,
    businessUnits,
    setSelectedClient,
    selectedEmployee,
    staffUser,
    optionForCustomerPortal,
    businessManager,
  } = useAppContext();

  const isTablet = useMediaQuery("(max-width: 944px)");
  const navigate = useNavigate();
  const location = useLocation();

  const navConfig = useNavConfig(optionForCustomerPortal ?? []);
  const configHeader = useConfigHeader(optionForCustomerPortal ?? []);

  const [collapse, setCollapse] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const toggleAlertModal = () => setIsAlertModalOpen(!isAlertModalOpen);

  const [isAbsenceDetailOpen, setIsAbsenceDetailOpen] = useState(false);
  const toggleAbsenceDetailModal = () =>
    setIsAbsenceDetailOpen(!isAbsenceDetailOpen);

  const { vacationDays, loadingDays, refetch } = useEmployeeVacationDays(
    selectedEmployee?.employeeId ?? null,
  );

  const totalDays =
    vacationDays?.reduce((sum, contract) => sum + contract.pendingDays, 0) ?? 0;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      collapseMenuRef.current &&
      !collapseMenuRef.current.contains(event.target as Node) &&
      businessUnitChangeRef.current &&
      !businessUnitChangeRef.current.contains(event.target as Node)
    ) {
      setCollapse(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoClick = (businessUnit: IBusinessUnit) => {
    setSelectedClient({
      id: businessUnit.businessUnitPublicCode,
      name: businessUnit.descriptionUse,
      sigla: businessUnit.abbreviatedName,
      logo: businessUnit.urlLogo,
    });

    setCollapse(false);
    navigate("/employees/select-employee");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (location.pathname.includes("/holidays")) {
      refetch();
    }
  }, [location.pathname]);

  const showBusinessUnitSelector = businessUnits.length > 1;
  const finalLogo = businessManager?.urlLogo ?? logoUrl;

  const headerUsername = staffUser
    ? `${staffUser.staffName} ${staffUser.staffLastName ?? ""}`
    : labels.layout.header.defaultUsername;

  const alertEvents = employeeAlertsMock.map((alert) => ({
    dateAndTime: alert.date,
    title: alert.title,
    message: alert.description,
  }));

  const { data: rawAbsences } = useEmployeeAbsences(
    (employeeAbsences) => employeeAbsences,
  );

  const lastAbsence =
    rawAbsences && rawAbsences.length > 0
      ? [...rawAbsences].sort(
          (a, b) =>
            new Date(b.absenceStartDate).getTime() -
            new Date(a.absenceStartDate).getTime(),
        )[0]
      : null;

  const absenceDetails = lastAbsence
    ? [
        {
          label: labels.layout.banner.absenceLabel,
          value:
            AbsenceReasonES[lastAbsence.absenceReason] ??
            lastAbsence.absenceReason,
        },
        {
          label: "Submotivo",
          value:
            ESubReasonES[lastAbsence.subReason as ESubReason] ??
            lastAbsence.subReason,
        },
        {
          label: "Fecha en que se produjo",
          value: new Date(lastAbsence.absenceStartDate).toLocaleDateString(),
        },
        {
          label: "Duración",
          value: lastAbsence.hoursAbsent
            ? `${lastAbsence.hoursAbsent} horas`
            : `${lastAbsence.absenceDays} días`,
        },
        {
          label: "Detalles del motivo",
          value: lastAbsence.absenceReasonDetails,
        },
      ]
    : [];

  let lastAbsenceDateRange: string | null = null;

  if (lastAbsence) {
    if (lastAbsence.hoursAbsent !== undefined) {
      lastAbsenceDateRange = formatDateRange(
        lastAbsence.absenceStartDate,
        lastAbsence.absenceStartDate,
      );
    }

    if (lastAbsence.absenceDays !== undefined) {
      lastAbsenceDateRange = formatDateRange(
        lastAbsence.absenceStartDate,
        new Date().toISOString(),
      );
    }
  }

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            selectedClient?.logo ?? logoUrl,
            selectedClient?.name ?? labels.layout.header.noClientSelected,
            selectedEmployee,
          )}
          user={{
            username: headerUsername,
            client:
              selectedClient?.name ?? labels.layout.header.noClientSelected,
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
          <Grid
            templateColumns={withNav && !isTablet ? "auto 1fr" : "1fr"}
            alignContent="unset"
            height="95vh"
          >
            {withNav && !isTablet && (
              <Nav
                navigation={navConfig}
                actions={actions}
                collapse
                footerLogo={finalLogo}
                footerLogoWidth="55%"
              />
            )}

            <StyledMainScroll>
              <Stack width="100%">
                {withBanner && (
                  <Stack
                    padding={`${spacing.s0} ${spacing.s075}`}
                    width="100%"
                    justifyContent="center"
                    margin={
                      isTablet
                        ? `${spacing.s100} ${spacing.s200}`
                        : `${spacing.s400} ${spacing.s800} ${spacing.s200}`
                    }
                  >
                    <VinculationBanner
                      key={
                        selectedEmployee
                          ? selectedEmployee.employeeId
                          : "no-employee"
                      }
                      name={
                        selectedEmployee
                          ? `${selectedEmployee.names} ${selectedEmployee.surnames}`
                          : labels.layout.banner.employeeNotSelected
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
                          label: labels.layout.banner.daysPendingLabel,
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
                                value:
                                  employeeAlertsMock.length > 99
                                    ? "+99"
                                    : employeeAlertsMock.length,
                                label: labels.layout.banner.alertsLabel,
                                onClick: toggleAlertModal,
                              },
                            ]
                          : []
                      }
                      seniorityItems={[
                        {
                          value: 2.5,
                          unit: "Años",
                          label: labels.layout.banner.seniorityLabel,
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
                                label: labels.layout.banner.absenceLabel,
                                value: lastAbsenceDateRange,
                                onClick: toggleAbsenceDetailModal,
                              },
                            ]
                          : []
                      }
                      isLoading={loadingDays}
                    />
                  </Stack>
                )}
              </Stack>

              <StyledMain $fullWidth={fullWidth}>
                <Outlet />
              </StyledMain>

              {isTablet && finalLogo && (
                <StyledFooter>
                  <Stack alignItems="center" gap={spacing.s050}>
                    <Text as="span" size="small" appearance="gray">
                      ®
                    </Text>
                    <StyledFinalLogo src={finalLogo} />
                  </Stack>
                </StyledFooter>
              )}
            </StyledMainScroll>
          </Grid>
        </StyledContainer>
      </Grid>

      {isModalOpen && (
        <OfferedGuaranteeModal handleClose={toggleModal} isMobile={isTablet} />
      )}

      {isAlertModalOpen && (
        <AlertModal
          handleClose={toggleAlertModal}
          title={labels.layout.modals.alertTitle}
          events={alertEvents}
        />
      )}

      {isAbsenceDetailOpen && (
        <AbsenceDetailModal
          title={labels.layout.modals.absenceDetailTitle}
          buttonLabel={labels.layout.modals.absenceDetailButton}
          details={absenceDetails}
          onClose={toggleAbsenceDetailModal}
        />
      )}
    </StyledAppPage>
  );
}

export { AppPage };
