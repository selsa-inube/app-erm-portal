import { useState, useEffect } from "react";
import { Logger } from "@utils/logger";
import { useAppContext } from "@context/AppContext/useAppContext";
import { getOptionForCustomerPortal } from "@services/staffPortal/getOptionForCustomerPortal";
import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";

const ERROR_CODE_NO_OPTIONS = 1005;
const ERROR_CODE_FETCH_OPTIONS_FAILED = 1014;

export function useOptionsMenu(
  staffPortalPublicCode: string,
  businessUnit: string,
) {
  const [optionData, setOptionData] = useState<IOptionWithSubOptions[]>([]);
  const [hasError, setHasError] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const { provisionedPortal, selectedClient } = useAppContext();
  const { showErrorModal } = useErrorModal();
  const { getHeaders } = useHeaders();

  useEffect(() => {
    const fetchOptionData = async () => {
      if (!provisionedPortal || !selectedClient) {
        setIsFetching(false);
        return;
      }

      setIsFetching(true);

      try {
        const headers = await getHeaders(true);
        const staffOptionData = await getOptionForCustomerPortal(
          staffPortalPublicCode,
          businessUnit,
          headers,
        );

        if (staffOptionData.length === 0) {
          setHasError(ERROR_CODE_NO_OPTIONS);
          const errorConfig = modalErrorConfig[ERROR_CODE_NO_OPTIONS];
          showErrorModal({
            descriptionText: errorConfig.descriptionText,
            solutionText: errorConfig.solutionText,
          });
          return;
        }

        setHasError(null);
        setOptionData(staffOptionData);
      } catch (error) {
        Logger.error(
          "Error al obtener las opciones del menú",
          error instanceof Error ? error : new Error(String(error)),
        );

        setHasError(ERROR_CODE_FETCH_OPTIONS_FAILED);
        const errorConfig = modalErrorConfig[ERROR_CODE_FETCH_OPTIONS_FAILED];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(error)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setIsFetching(false);
      }
    };

    void fetchOptionData();
  }, [
    provisionedPortal,
    selectedClient,
    staffPortalPublicCode,
    businessUnit,
    showErrorModal,
    getHeaders,
  ]);

  return { optionData, hasError, isFetching };
}
