import {
  environment,
  fetchTimeoutServices,
  maxRetriesServices,
} from "@config/environment";
import { Logger } from "@utils/logger";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";

import { mapStaffUserAccountApiToEntity } from "./mappers";

const staffUserAccountById = async (
  userAccountId: string,
  headers: Record<string, string>,
): Promise<IStaffUserAccount> => {
  const maxRetries = maxRetriesServices;
  const fetchTimeout = fetchTimeoutServices;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), fetchTimeout);

      const params = new URLSearchParams({
        identificationDocumentNumber: userAccountId,
      });

      const res = await fetch(
        `${environment.IVITE_ISTAFF_QUERY_PROCESS_SERVICE}/staffs?${params.toString()}`,
        {
          method: "GET",
          headers: {
            ...headers,
            "Content-type": "application/json; charset=UTF-8",
            "X-Action": "SearchAllStaff",
          },
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (res.status === 204) {
        return {} as IStaffUserAccount;
      }

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data?.message ?? "Error al obtener los datos del usuario";
        throw new Error(errorMessage);
      }

      return mapStaffUserAccountApiToEntity(data[0]);
    } catch (error) {
      if (attempt === maxRetries) {
        Logger.error(
          "Error al obtener el usuario staff por identificación",
          error instanceof Error ? error : new Error("Error desconocido"),
          {
            userAccountId,
          },
        );

        if (error instanceof Error) {
          throw error;
        }

        throw new Error(
          "Todos los intentos fallaron. No se pudieron obtener los datos del usuario.",
        );
      }
    }
  }

  return {} as IStaffUserAccount;
};

export { staffUserAccountById };
