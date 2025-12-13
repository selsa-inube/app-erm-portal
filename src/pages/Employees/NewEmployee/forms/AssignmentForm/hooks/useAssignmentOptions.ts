import { useState, useEffect } from "react";
import { IOption } from "@inubekit/inubekit";

import { Logger } from "@utils/logger";
import { getRemunerationProfiles } from "@services/catalogs/getRemunerationProfiles";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";

import { mapProfilesToOptions } from "../utils/mappers";

const ERROR_CODE_FETCH_ASSIGNMENT_OPTIONS_FAILED = 1019;

export const useAssignmentOptions = () => {
  const [assignmentOptions, setAssignmentOptions] = useState<IOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<number | null>(null);

  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchAssignmentOptions = async () => {
      setIsLoading(true);
      setHasError(null);

      try {
        const headers = await getHeaders();
        const remunerationProfiles = await getRemunerationProfiles(headers);
        setAssignmentOptions(mapProfilesToOptions(remunerationProfiles));
      } catch (err) {
        Logger.error(
          "Error al obtener las opciones de asignación",
          err instanceof Error ? err : new Error(String(err)),
        );

        setHasError(ERROR_CODE_FETCH_ASSIGNMENT_OPTIONS_FAILED);

        const errorConfig =
          modalErrorConfig[ERROR_CODE_FETCH_ASSIGNMENT_OPTIONS_FAILED];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignmentOptions();
  }, []);

  return { assignmentOptions, isLoading, hasError };
};
