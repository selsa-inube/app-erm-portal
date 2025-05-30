import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { useHumanResourceRequests } from "@hooks/useHumanResourceRequests";
import { useAppContext } from "@context/AppContext/useAppContext";

import { formatHumanResourceRequests } from "./formatHumanResourceRequests";
import { RequestsUI } from "./interface";
import { assignmentOptions, statusOptions } from "./config";
import { IOption, IRequest } from "./types";
import { breadcrumbs } from "./config/nav.config";

function Requests() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<IOption[]>([]);

  const { selectedEmployee } = useAppContext();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const isTablet = useMediaQuery("(max-width: 1280px)");
  const isMobile = useMediaQuery("(max-width: 490px)");

  const employeeId = selectedEmployee?.employeeId ?? "";

  const { data } = useHumanResourceRequests<IRequest>(
    formatHumanResourceRequests,
    undefined,
    employeeId,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const boardSections = [
    {
      sectionTitle: "Por evaluar",
      value: "pending",
      sectionBackground: "gray" as const,
      sectionInformation: data.filter((req) => req.status === "pending"),
    },
    {
      sectionTitle: "En progreso",
      value: "inProgress",
      sectionBackground: "light" as const,
      sectionInformation: data.filter((req) => req.status === "inProgress"),
    },
    {
      sectionTitle: "Terminada",
      value: "completed",
      sectionBackground: "gray" as const,
      sectionInformation: data.filter((req) => req.status === "completed"),
    },
  ];

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeFilterModal = () => setIsFilterModalOpen(false);

  return (
    <RequestsUI
      appName={breadcrumbs.label}
      appRoute={breadcrumbs.crumbs}
      navigatePage={breadcrumbs.url}
      isFilterModalOpen={isFilterModalOpen}
      isMenuOpen={isMenuOpen}
      menuRef={menuRef}
      isMobile={isMobile}
      isTablet={isTablet}
      assignmentOptions={assignmentOptions}
      statusOptions={statusOptions}
      searchTerm={searchTerm}
      debouncedSearchTerm={debouncedSearchTerm}
      selectedFilters={selectedFilters}
      setSearchTerm={setSearchTerm}
      setSelectedFilters={setSelectedFilters}
      openFilterModal={openFilterModal}
      closeFilterModal={closeFilterModal}
      setIsMenuOpen={setIsMenuOpen}
      boardSections={boardSections}
    />
  );
}

export { Requests };
