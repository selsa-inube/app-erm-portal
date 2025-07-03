import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Nav,
  Grid,
  Header,
  useMediaQuery,
  Icon,
  Stack,
} from "@inubekit/inubekit";
import { MdOutlineChevronRight, MdOutlineBeachAccess } from "react-icons/md";

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
import { OfferedGuaranteeModal } from "@components/modals/OfferedGuaranteeModal";
import { useEmployeeVacationDays } from "@hooks/useEmployeeVacationDays";
import { Employee } from "@ptypes/employeePortalConsultation.types";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledCollapseIcon,
  StyledCollapse,
  StyledMainScroll,
} from "./styles";

interface AppPageProps {
  withNav?: boolean;
  withBanner?: boolean;
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
  const { withNav = true, withBanner = true } = props;
  const {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    setSelectedClient,
    selectedEmployee,
    optionForCustomerPortal,
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

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            selectedClient?.logo ?? logoUrl,
            selectedClient?.name ?? "Sin unidad seleccionada",
            selectedEmployee,
          )}
          user={{
            username: user?.username ?? "Nombre de usuario",
            client: selectedClient?.name ?? "Sin unidad seleccionada",
            breakpoint: "800px",
          }}
          menu={userMenu}
        />

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
        {collapse && (
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
              <Nav navigation={navConfig} actions={actions} collapse={true} />
            )}
            <StyledMainScroll>
              <Stack width="100%">
                {withBanner && (
                  <Stack
                    padding={spacing.s075}
                    width="100%"
                    justifyContent="center"
                    margin={
                      isTablet
                        ? `${spacing.s0} ${spacing.s200}`
                        : `${spacing.s400} ${spacing.s800} ${spacing.s0} `
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
                      isLoading={loadingDays}
                    />
                  </Stack>
                )}
              </Stack>
              <StyledMain>
                <Outlet />
              </StyledMain>
            </StyledMainScroll>
          </Grid>
        </StyledContainer>
      </Grid>

      {isModalOpen && (
        <OfferedGuaranteeModal handleClose={toggleModal} isMobile={isTablet} />
      )}
    </StyledAppPage>
  );
}

export { AppPage };
