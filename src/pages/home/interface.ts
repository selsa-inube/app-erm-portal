import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navConfig, useConfigHeader } from "@config/nav.config";
import { useAppContext } from "@context/AppContext";
import { useEmployeeVacationDays } from "@hooks/useEmployeeVacationDays";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";

export const useHome = () => {
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
      icon: React.ReactNode;
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

  const showBusinessUnitSelector = businessUnits.length > 1;

  return {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    selectedEmployee,
    configHeader,
    collapse,
    setCollapse,
    isModalOpen,
    toggleModal,
    collapseMenuRef,
    businessUnitChangeRef,
    dataOptions,
    totalDays,
    loadingDays,
    handleLogoClick,
    showBusinessUnitSelector,
  };
};
