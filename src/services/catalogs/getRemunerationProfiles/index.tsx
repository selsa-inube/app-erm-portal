import { fetchTimeoutServices, maxRetriesServices } from "@config/environment";

import { Logger } from "@utils/logger";
export interface IRemunerationProfile {
  remunerationProfileId: string;
  remunerationProfileName: string;
  remunerationProfileDescription: string;
  regulatoryFrameworkCode: string;
}

const getRemunerationProfiles = async (
  headers: Record<string, string>,
): Promise<IRemunerationProfile[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const res = await fetch(
        `http://localhost:3001/portal-erm-query-process-service/api/remuneration-profiles-catalog`,
        {
          method: "GET",
          headers: {
            ...headers,
            "X-Action": "SearchAllRemunerationProfileCatalog",
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData?.message ??
          `Error al obtener los perfiles de remuneración (Status: ${res.status})`;
        throw new Error(errorMessage);
      }

      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener los perfiles de remuneración",
          error instanceof Error ? error : new Error(String(error)),
        );

        if (error instanceof Error) {
          throw error;
        }

        throw new Error(
          "Todos los intentos fallaron. No se pudo obtener los perfiles de remuneración.",
        );
      }
    }
  }

  return [];
};

export { getRemunerationProfiles };
