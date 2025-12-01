import { useState, useEffect, useCallback } from "react";

import { Logger } from "@utils/logger";
import { getAllEmployees } from "@services/employeeConsultation";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";

const ERROR_CODE_FETCH_EMPLOYEES_FAILED = 1011;

interface UseAllEmployeesResult {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refetch: (page?: number, perPage?: number) => void;
}

export const useAllEmployees = (
  initialPage = 1,
  initialPerPage = 500,
): UseAllEmployeesResult => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPerPage);
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  const fetchEmployees = useCallback(
    async (fetchPage = page, fetchPerPage = perPage) => {
      setLoading(true);
      setError(null);

      try {
        const headers = await getHeaders();
        const data = await getAllEmployees(fetchPage, fetchPerPage, headers);
        setEmployees(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ocurrió un error desconocido al obtener la lista de empleados";

        Logger.error(
          "Error al obtener la lista de empleados",
          err instanceof Error ? err : new Error(String(err)),
          {
            useCase: "useAllEmployees",
            page: fetchPage,
            perPage: fetchPerPage,
          },
        );
        setError(errorMessage);

        const errorConfig = modalErrorConfig[ERROR_CODE_FETCH_EMPLOYEES_FAILED];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setLoading(false);
      }
    },
    [page, perPage, getHeaders, showErrorModal],
  );

  useEffect(() => {
    fetchEmployees();
  }, [page, perPage, fetchEmployees]);

  const refetch = (newPage = page, newPerPage = perPage) => {
    setPage(newPage);
    setPerPage(newPerPage);
    fetchEmployees(newPage, newPerPage);
  };

  return { employees, loading, error, refetch };
};
