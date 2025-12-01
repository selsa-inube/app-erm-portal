import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";
import { Logger } from "@utils/logger";

interface StaffUseCaseResponse {
  listOfUseCases: string[];
}

const getStaffUseCases = async (
  businessManagerCode: string,
  businessUnitCode: string,
  id: string,
  headers: Record<string, string>,
): Promise<string[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const queryParameters = new URLSearchParams({
        businessManagerCode,
        businessUnitCode,
      });

      const res = await fetch(
        `${environment.IVITE_ISTAFF_QUERY_PROCESS_SERVICE}/staffs?${queryParameters}`,
        {
          method: "GET",
          headers: {
            "X-Action": "SearchUseCaseForStaff",
            "X-User-Name": id,
            ...headers,
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return [];
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData?.message ??
          `Error al obtener los casos de uso del staff (Status: ${res.status})`;
        throw new Error(errorMessage);
      }

      const data: string[] = await res.json();
      return data;
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener los casos de uso del staff",
          error instanceof Error ? error : new Error("Error desconocido"),
          {
            businessManagerCode,
            businessUnitCode,
            userId: id,
          },
        );

        if (error instanceof Error) {
          throw error;
        }

        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener los casos de uso del staff.",
        );
      }
    }
  }

  return [];
};

export { getStaffUseCases };
export type { StaffUseCaseResponse };
