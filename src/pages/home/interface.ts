import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { labels } from "@i18n/labels";
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

  const lastAbsence =
    rawAbsences && rawAbsences.length > 0
      ? [...rawAbsences].sort(
          (a, b) =>
            new Date(b.absenceStartDate).getTime() -
            new Date(a.absenceStartDate).getTime(),
        )[0]
      : null;

  let lastAbsenceDateRange: string | null = null;

  if (lastAbsence) {
    if (lastAbsence.absenceStartHour !== undefined) {
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

  const absences = lastAbsence
    ? [
        {
          label: labels.home.absenceDetail.reason,
          value:
            AbsenceReasonES[lastAbsence.absenceReason] ??
            lastAbsence.absenceReason,
        },
        {
          label: labels.home.absenceDetail.subReason,
          value:
            ESubReasonES[lastAbsence.subReason as ESubReason] ??
            lastAbsence.subReason,
        },
        {
          label: labels.home.absenceDetail.occurrenceDate,
          value: new Date(lastAbsence.absenceStartDate).toLocaleDateString(),
        },
        {
          label: labels.home.absenceDetail.duration,
          value: lastAbsence.hoursAbsent
            ? `${lastAbsence.hoursAbsent} ${labels.home.absenceDetail.hours}`
            : `${lastAbsence.absenceDays} ${labels.home.absenceDetail.days}`,
        },
        {
          label: labels.home.absenceDetail.reasonDetails,
          value: lastAbsence.absenceReasonDetails,
        },
      ]
    : [];

  const [isAbsenceDetailOpen, setIsAbsenceDetailOpen] = useState(false);
  const toggleAbsenceDetailModal = () =>
    setIsAbsenceDetailOpen(!isAbsenceDetailOpen);

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
