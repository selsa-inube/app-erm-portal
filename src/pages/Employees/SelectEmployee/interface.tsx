import { useEffect, useState, useMemo } from "react";
import { FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useAllEmployees } from "@hooks/useEmployeeConsultation";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import { useAppContext } from "@context/AppContext";
import { labels } from "@i18n/labels";

export interface UseSelectEmployeeReturn {
  employees: Employee[];
  filteredEmployees: Employee[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  refetch: () => void;
  validationSchema: Yup.ObjectSchema<{ keyword: string }>;
  handleEmployeeSelection: (
    emp: Employee,
    formik: FormikProps<{ keyword: string }>,
  ) => void;
  selectedEmployee: Employee;
  handleSubmit: (values: { employee: string }) => void;
  isSubmitting: boolean;
}

export function useSelectEmployee(): UseSelectEmployeeReturn {
  const { employees, loading, error, refetch } = useAllEmployees();
  const { setSelectedEmployee, selectedEmployee } = useAppContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedEmployee = localStorage.getItem("selectedEmployee");
    if (storedEmployee) {
      setSelectedEmployee(JSON.parse(storedEmployee));
    }
  }, [setSelectedEmployee]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 600);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const normalizeText = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredEmployees = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return [];

    const normalizedSearch = normalizeText(debouncedSearchTerm);

    const results = employees.filter((emp) => {
      const normalizedName = normalizeText(emp.names);
      const normalizedSurname = normalizeText(emp.surnames);
      const normalizedId = normalizeText(emp.identificationDocumentNumber);

      return (
        normalizedName.includes(normalizedSearch) ||
        normalizedSurname.includes(normalizedSearch) ||
        normalizedId.includes(normalizedSearch)
      );
    });

    if (results.length === 0) {
      return [
        {
          employeeId: "no-results",
          names: labels.employee.selection.noResults,
          surnames: "",
          identificationDocumentNumber: "",
        },
      ] as Employee[];
    }

    return results;
  }, [debouncedSearchTerm, employees]);

  const validationSchema: Yup.ObjectSchema<{ keyword: string }> = Yup.object({
    keyword: Yup.string()
      .required(labels.employee.validation.required)
      .test(
        "is-valid-employee",
        labels.employee.validation.invalidSelection,
        function (value) {
          return employees.some(
            (emp) =>
              `${emp.identificationDocumentNumber} - ${emp.names} ${emp.surnames}` ===
              value,
          );
        },
      ),
  });

  const handleEmployeeSelection = (
    emp: Employee,
    formik: FormikProps<{ keyword: string }>,
  ) => {
    if (emp.employeeId === "no-results") return;

    setIsSubmitting(true);

    setTimeout(() => {
      formik.setFieldValue(
        "keyword",
        `${emp.identificationDocumentNumber} - ${emp.names} ${emp.surnames}`,
      );
      setSelectedEmployee(emp);
      localStorage.setItem("selectedEmployee", JSON.stringify(emp));
      setSearchTerm("");
      setIsSubmitting(false);
    }, 300);
  };

  const handleSubmit = (values: { employee: string }) => {
    setIsSubmitting(true);

    setTimeout(() => {
      const selectedEmployeeOption = employees.find(
        (emp) => emp.employeeId === values.employee,
      );

      if (selectedEmployeeOption) {
        setSelectedEmployee(selectedEmployeeOption);
        localStorage.setItem(
          "selectedEmployee",
          JSON.stringify(selectedEmployeeOption),
        );
        navigate("/");
      } else {
        console.error(labels.employee.errors.employeeNotFound);
      }

      setIsSubmitting(false);
    }, 300);
  };

  return {
    employees,
    filteredEmployees,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refetch,
    validationSchema,
    handleEmployeeSelection,
    selectedEmployee,
    handleSubmit,
    isSubmitting,
  };
}
