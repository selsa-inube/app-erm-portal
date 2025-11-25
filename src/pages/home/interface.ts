import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { navConfig, useConfigHeader } from "@config/nav.config";
import { useAppContext } from "@context/AppContext";
import { useEmployeeVacationDays } from "@hooks/useEmployeeVacationDays";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";
import { useEmployeeAbsences } from "@hooks/useEmployeeAbsences";
import {
  AbsenceReasonES,
  ESubReasonES,
  ESubReason,
} from "@ptypes/employeeAbsence.types";
import { formatDateRange } from "@utils/date";

export const useHome = () => {
  const {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    staffUser,
    businessManager,
    setSelectedClient,
    selectedEmployee,
    optionForCustomerPortal,
  } = useAppContext();

  const navigate = useNavigate();

  const { vacationDays, loadingDays } = useEmployeeVacationDays(
    selectedEmployee?.employeeId ?? null,
  );

  const totalDays =
    vacationDays?.reduce((sum, contract) => sum + contract.pendingDays, 0) ?? 0;

  const configHeader = useConfigHeader(optionForCustomerPortal ?? []);

  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

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

  const { data: rawAbsences } = useEmployeeAbsences(
    (employeeAbsences) => employeeAbsences,
  );

  let lastAbsenceDateRange: string | null = null;

  if (rawAbsences && rawAbsences.length > 0) {
    const sortedAbsences = [...rawAbsences].sort(
      (a, b) =>
        new Date(b.absenceStartDate).getTime() -
        new Date(a.absenceStartDate).getTime(),
    );

    const mostRecent = sortedAbsences[0];

    const isHours = mostRecent.absenceStartHour !== undefined;
    const isDays = mostRecent.absenceDays !== undefined;

    if (isHours) {
      lastAbsenceDateRange = formatDateRange(
        mostRecent.absenceStartDate,
        mostRecent.absenceStartDate,
      );
    }

    if (isDays) {
      const todayISO = new Date().toISOString();
      lastAbsenceDateRange = formatDateRange(
        mostRecent.absenceStartDate,
        todayISO,
      );
    }
  }

  const [isAbsenceDetailOpen, setIsAbsenceDetailOpen] = useState(false);
  const toggleAbsenceDetailModal = () =>
    setIsAbsenceDetailOpen(!isAbsenceDetailOpen);

  const absences =
    rawAbsences
      ?.map((a) => [
        {
          label: "Motivo",
          value: AbsenceReasonES[a.absenceReason] ?? a.absenceReason,
        },
        {
          label: "Submotivo",
          value: ESubReasonES[a.subReason as ESubReason] ?? a.subReason,
        },
        {
          label: "Fecha en que se produjo",
          value: new Date(a.absenceStartDate).toLocaleDateString(),
        },
        { label: "Duración", value: `${a.hoursAbsent} horas` },
        { label: "Detalles del motivo", value: a.absenceReasonDetails },
      ])
      .flat() ?? [];

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

  const showBusinessUnitSelector = businessUnits.length > 1;

  return {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    businessManager,
    selectedEmployee,
    configHeader,
    collapse,
    staffUser,
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
    lastAbsenceDateRange,
    toggleAbsenceDetailModal,
    isAbsenceDetailOpen,
    absences,
  };
};
