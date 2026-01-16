import { useState, useEffect } from "react";

import { Logger } from "@utils/logger";
import { staffUserAccountById } from "@services/StaffUser/StaffUserAccountIportalStaff";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { useHeaders } from "@hooks/useHeaders";
import { getPreAuthHeaders } from "@utils/preAuthHeaders";

const ERROR_CODE_FETCH_USER_ACCOUNT_FAILED = 1018;

interface UseStaffUserAccountProps {
  userAccountId: string;
  onUserAccountLoaded?: (userAccount: IStaffUserAccount) => void;
  preAuth?: boolean;
}

export const useStaffUserAccount = ({
  userAccountId,
  onUserAccountLoaded,
  preAuth = false,
}: UseStaffUserAccountProps) => {
  const [userAccount, setUserAccount] = useState<IStaffUserAccount>();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState<number | null>(null);

  const { showErrorModal } = useErrorModal();

  let getHeadersFn: () => Promise<Record<string, string>>;
  if (preAuth) {
    getHeadersFn = () => Promise.resolve(getPreAuthHeaders());
  } else {
    try {
      const { getHeaders } = useHeaders();
      getHeadersFn = getHeaders;
    } catch {
      getHeadersFn = () => Promise.resolve(getPreAuthHeaders());
    }
  }

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (!userAccountId) {
        setHasError(null);
        setUserAccount(undefined);
        setLoading(false);
        return;
      }

      setLoading(true);
      setHasError(null);

      try {
        const headers = await getHeadersFn();
        const data = await staffUserAccountById(userAccountId, headers);
        setUserAccount(data);
        if (onUserAccountLoaded) onUserAccountLoaded(data);
      } catch (error) {
        Logger.error(
          "Error al obtener la cuenta de usuario del staff",
          error instanceof Error ? error : new Error(String(error)),
        );

        setHasError(ERROR_CODE_FETCH_USER_ACCOUNT_FAILED);

        const errorConfig =
          modalErrorConfig[ERROR_CODE_FETCH_USER_ACCOUNT_FAILED];
        showErrorModal({
          descriptionText: `${errorConfig.descriptionText}: ${String(error)}`,
          solutionText: errorConfig.solutionText,
        });
      } finally {
        setLoading(false);
      }
    };

    void fetchUserAccount();
  }, [userAccountId, onUserAccountLoaded, showErrorModal, getHeadersFn]);

  return { userAccount, loading, hasError };
};
