import {
  fetchTimeoutServices,
  maxRetriesServices,
  environment,
} from "@config/environment";
import { Logger } from "@utils/logger";

import { mapImmediateSupervisorByRequestApiToEntity } from "./mappers";

const getImmediateSupervisorByRequest = async (
  humanResourceRequestId?: string,
  headers?: Record<string, string>,
) => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const res = await fetch(
        `${environment.IVITE_IPORTAL_EMPLOYEE_QUERY_PROCESS_SERVICE}/human-resources-requests/${humanResourceRequestId}`,
        {
          method: "GET",
          headers: {
            "X-Action": "SearchForImmediateSupervisorByRequest",
            ...headers,
          },
          signal: controller.signal,
        },
      );

      if (res.status === 204) {
        clearTimeout(timeoutId);
        return null;
      }

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(
          `Error al obtener el supervisor inmediato (Status: ${res.status})`,
        );
      }

      const data = await res.json();

      return data ? mapImmediateSupervisorByRequestApiToEntity(data) : null;
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener el supervisor inmediato",
          error instanceof Error ? error : new Error(String(error)),
          {
            humanResourceRequestId,
          },
        );

        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener el supervisor inmediato.",
        );
      }
    }
  }

  return null;
};

export { getImmediateSupervisorByRequest };
