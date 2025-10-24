import { useState, useEffect } from "react";

import { useAppContext } from "@context/AppContext/useAppContext";
import { getOptionForCustomerPortal } from "@services/staffPortal/getOptionForCustomerPortal";
import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_NO_OPTIONS = 1005;
const ERROR_CODE_FETCH_OPTIONS_FAILED = 1014;

export function useOptionsMenu(
  staffPortalPublicCode: string,
  businessUnit: string,
) {
  const [optionData, setOptionData] = useState<IOptionWithSubOptions[]>(
    [] as IOptionWithSubOptions[],
  );
  const [hasError, setHasError] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const { provisionedPortal, selectedClient } = useAppContext();
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchoptionData = async () => {
      setIsFetching(true);

      if (!provisionedPortal || !selectedClient) {
        setHasError(ERROR_CODE_NO_OPTIONS);
        setIsFetching(false);

        const errorConfig = modalErrorConfig[ERROR_CODE_NO_OPTIONS];
        showErrorModal({
          descriptionText: errorConfig.descriptionText,
          solutionText: errorConfig.solutionText,
        });
        return;
      }

      try {
        const staffoptionData = await getOptionForCustomerPortal(
          staffPortalPublicCode,
          businessUnit,
        );

        if (staffoptionData.length === 0) {
          setHasError(ERROR_CODE_NO_OPTIONS);

          const errorConfig = modalErrorConfig[ERROR_CODE_NO_OPTIONS];
          showErrorModal({
            descriptionText: errorConfig.descriptionText,
            solutionText: errorConfig.solutionText,
          });
          return;
        }

        setHasError(null);
        setOptionData(staffoptionData);
      } catch (error) {
        console.error("Error al obtener las opciones del menú:", error);
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

    void fetchoptionData();
  }, [
    provisionedPortal,
    selectedClient,
    staffPortalPublicCode,
    businessUnit,
    showErrorModal,
  ]);

  return { optionData, hasError, isFetching };
}
