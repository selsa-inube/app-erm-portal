import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MdOutlineBeachAccess, MdOutlineChevronRight } from "react-icons/md";
import {
  Text,
  Icon,
  Stack,
  Grid,
  Header,
  useMediaQuery,
} from "@inubekit/inubekit";

import { AppCard } from "@components/feedback/AppCard";
import { spacing } from "@design/tokens/spacing";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange";
import { userMenu, useConfigHeader, navConfig } from "@config/nav.config";
import { useAppContext } from "@context/AppContext";
import { VinculationBanner } from "@components/layout/Banner";
import { OfferedGuaranteeModal } from "@components/modals/OfferedGuaranteeModal";
import { useEmployeeVacationDays } from "@hooks/useEmployeeVacationDays";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledQuickAccessContainer,
  StyledCollapseIcon,
  StyledCollapse,
} from "./styles";

const renderLogo = (imgUrl: string, altText: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} alt={altText} />
    </StyledContentImg>
  );
};

function Home() {
  const {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    setSelectedClient,
    selectedEmployee,
    optionForCustomerPortal,
  } = useAppContext();

  const { vacationDays, loadingDays } = useEmployeeVacationDays(
    selectedEmployee?.employeeId ?? null,
  );
  const totalDays =
    vacationDays?.reduce((sum, contract) => sum + contract.pendingDays, 0) ?? 0;

  const configHeader = useConfigHeader(optionForCustomerPortal ?? []);
  const isTablet = useMediaQuery("(max-width: 944px)");
  const navigate = useNavigate();

  const [collapse, setCollapse] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);
  const [dataOptions, setDataOptions] = useState<
    {
      isEnabled: boolean;
      id: string;
      label: string;
      icon: React.ReactElement;
      path: string;
      description: string;
    }[]
  >();

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
    if (!selectedClient) {
      navigate("/login", { replace: true });
    }
  }, [selectedClient, navigate]);

  useEffect(() => {
    if (optionForCustomerPortal) {
      setDataOptions(navConfig(optionForCustomerPortal));
    }
  }, [optionForCustomerPortal]);

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

  return (
    <StyledAppPage>
      <Grid templateRows="auto auto" height="100vh" justifyContent="unset">
        <Header
          navigation={{ nav: configHeader, breakpoint: "800px" }}
          logoURL={renderLogo(
            selectedClient?.logo ?? logoUrl,
            selectedClient?.name ?? "Sin unidad seleccionada",
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
          <Stack
            padding={`${isTablet ? spacing.s100 : spacing.s400} ${isTablet ? spacing.s200 : spacing.s800} ${isTablet ? spacing.s400 : spacing.s200}`}
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
      {isModalOpen && (
        <OfferedGuaranteeModal handleClose={toggleModal} isMobile={isTablet} />
      )}
    </StyledAppPage>
  );
}

export { Home };
