import { useState, useEffect } from "react";

import { Logger } from "@utils/logger";
import { encrypt } from "@utils/encrypt";
import { staffPortalByBusinessManager } from "@services/staffPortal/StaffPortalByBusinessManager";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_NO_PORTAL_DATA = 1001;
const ERROR_CODE_FETCH_PORTAL_FAILED = 1016;

export const usePortalData = (codeParame: string) => {
  const [portalData, setPortalData] = useState<IStaffPortalByBusinessManager>(
    {} as IStaffPortalByBusinessManager,
  );
  const [hasError, setHasError] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchPortalData = async () => {
      setIsFetching(true);

      if (!codeParame) {
        return;
      }

      try {
        const staffPortalData = await staffPortalByBusinessManager(codeParame);

        if (!staffPortalData || Object.keys(staffPortalData).length === 0) {
          setHasError(ERROR_CODE_NO_PORTAL_DATA);

          const errorConfig = modalErrorConfig[ERROR_CODE_NO_PORTAL_DATA];
          showErrorModal({
            descriptionText: errorConfig.descriptionText,
            solutionText: errorConfig.solutionText,
          });
          return;
        }

        const encryptedParamValue = encrypt(codeParame);
        localStorage.setItem("portalCode", encryptedParamValue);
        setHasError(null);
        setPortalData(staffPortalData);
      } catch (error) {
        Logger.error(
          "Error al obtener los datos del portal",
          error instanceof Error ? error : new Error(String(error)),
        );

        setHasError(ERROR_CODE_FETCH_PORTAL_FAILED);

        const errorConfig = modalErrorConfig[ERROR_CODE_FETCH_PORTAL_FAILED];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(error)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setIsFetching(false);
      }
    };

    void fetchPortalData();
  }, [codeParame, showErrorModal]);

  return { portalData, hasError, isFetching };
};
