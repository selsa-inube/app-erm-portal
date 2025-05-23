import { useState, useEffect, useCallback } from "react";

import { getAllEmployees } from "@services/employeeConsultation";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useHeaders } from "@hooks/useHeaders";

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

  useErrorFlag(!!error, error ?? undefined);

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

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [page, perPage],
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
