import { useState, useEffect } from "react";

import { staffUserAccountById } from "@services/StaffUser/StaffUserAccountIportalStaff";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_FETCH_USER_ACCOUNT_FAILED = 1018;

interface UseStaffUserAccountProps {
  userAccountId: string;
  onUserAccountLoaded?: (userAccount: IStaffUserAccount) => void;
}

export const useStaffUserAccount = ({
  userAccountId,
  onUserAccountLoaded,
}: UseStaffUserAccountProps) => {
  const [userAccount, setUserAccount] = useState<IStaffUserAccount>();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<number | null>(null);

  const { showErrorModal } = useErrorModal();

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
        const data = await staffUserAccountById(userAccountId);
        setUserAccount(data);
        if (onUserAccountLoaded) {
          onUserAccountLoaded(data);
        }
      } catch (error) {
        console.error(
          "Error al obtener la cuenta de usuario del staff:",
          error,
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

    fetchUserAccount();
  }, [userAccountId, onUserAccountLoaded, showErrorModal]);

  return { userAccount, loading, hasError };
};
