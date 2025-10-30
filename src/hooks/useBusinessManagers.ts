import { useState, useEffect } from "react";

import { IBusinessManager } from "@ptypes/employeePortalBusiness.types";
import { IStaffPortalByBusinessManager } from "@ptypes/staffPortalBusiness.types";
import { getBusinessManagerByCode } from "@services/businessManagers/getBusinessManagerByCode";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

interface UseBusinessManagersReturn {
  businessManagersData: IBusinessManager;
  hasError: boolean;
  codeError: number | undefined;
  isFetching: boolean;
}

export const useBusinessManagers = (
  portalPublicCode: IStaffPortalByBusinessManager,
): UseBusinessManagersReturn => {
  const [businessManagersData, setBusinessManagersData] =
    useState<IBusinessManager>({} as IBusinessManager);
  const [hasError, setHasError] = useState(false);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    const fetchBusinessManagers = async (): Promise<void> => {
      if (!portalPublicCode?.publicCode) return;

      setIsFetching(true);
      try {
        const fetchedBusinessManagers = await getBusinessManagerByCode(
          portalPublicCode.publicCode,
        );

        if (
          !fetchedBusinessManagers ||
          Object.keys(fetchedBusinessManagers).length === 0
        ) {
          setHasError(true);
          setCodeError(1002);

          const errorConfig = modalErrorConfig[1002];
          showErrorModal({
            descriptionText: `${errorConfig.descriptionText}: ${codeError}`,
            solutionText: errorConfig.solutionText,
          });
          return;
        }

        setHasError(false);
        setBusinessManagersData(fetchedBusinessManagers);
      } catch (err) {
        console.error(
          "Error al obtener los datos del gestor de negocios:",
          err,
        );
        setHasError(true);
        setCodeError(1007);

        const errorConfig = modalErrorConfig[1007];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(err)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchBusinessManagers();
  }, [portalPublicCode, showErrorModal]);

  return { businessManagersData, hasError, codeError, isFetching };
};
