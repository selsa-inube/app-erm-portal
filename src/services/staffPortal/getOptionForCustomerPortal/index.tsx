import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";
import { Logger } from "@utils/logger";
import { mapOptionForCustomerPortalApiToEntities } from "./mappers";

const getOptionForCustomerPortal = async (
  staffPortalPublicCode: string,
  businessUnit: string,
  headers?: Record<string, string>,
): Promise<IOptionWithSubOptions[]> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const queryParams = new URLSearchParams({
        staffPortalPublicCode,
        businessUnit,
      });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const res = await fetch(
        `${environment.IVITE_ISAAS_QUERY_PROCESS_SERVICE}/staff-portals-by-business-manager?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            ...headers,
            "X-Action": "SearchOptionsStaffPortalByBusinessUnit",
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (res.status === 204) return [];

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data?.message ?? "Error al obtener los datos del portal";
        throw new Error(errorMessage);
      }

      return Array.isArray(data)
        ? mapOptionForCustomerPortalApiToEntities(data)
        : [];
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener las opciones del portal del cliente",
          error instanceof Error ? error : new Error("Error desconocido"),
          { staffPortalPublicCode, businessUnit },
        );

        if (error instanceof Error) throw error;
        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del portal.",
        );
      }
    }
  }

  return [];
};

export { getOptionForCustomerPortal };
