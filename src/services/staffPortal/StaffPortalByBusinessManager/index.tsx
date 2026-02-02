import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";
import { Logger } from "@utils/logger";
import { mapStaffPortalByBusinessManagerApiToEntities } from "./mappers";

const staffPortalByBusinessManager = async (
  headers?: Record<string, string>,
): Promise<IStaffPortalByBusinessManager> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        publicCode: environment.APPLICATION_NAME,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const res = await fetch(
        `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/staff-portals-by-business-manager?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            ...headers,
            "X-Action": "SearchAllStaffPortalsByBusinessManager",
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (res.status === 204) return {} as IStaffPortalByBusinessManager;

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ?? "Error al obtener los datos del portal",
        );
      }

      const normalizedData = Array.isArray(data)
        ? mapStaffPortalByBusinessManagerApiToEntities(data)
        : [];

      return normalizedData[0];
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener el staff portal por business manager",
          error instanceof Error ? error : new Error("Error desconocido"),
          { publicCode: environment.APPLICATION_NAME },
        );
        throw error;
      }
    }
  }

  return {} as IStaffPortalByBusinessManager;
};

export { staffPortalByBusinessManager };
