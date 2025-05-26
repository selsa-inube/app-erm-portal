import { useState, useEffect } from "react";
import { staffUserAccountById } from "@services/StaffUser/StaffUserAccountIportalStaff";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";
import { useErrorFlag } from "./useErrorFlag";
import { mapStaffUserAccountApiToEntity } from "@src/services/StaffUser/StaffUserAccountIportalStaff/mappers";
import { dataStaff } from "@src/mocks/staff/staff.mock";
import { environment } from "@src/config/environment";

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
  const [hasError, setHasError] = useState<number | null>(1001);
  const [flagShown, setFlagShown] = useState(false);

  useErrorFlag(flagShown);

  useEffect(() => {
    const fetchUserAccount = async () => {
      if (!userAccountId) {
        setHasError(null);
        setUserAccount(undefined);
        return;
      }

      setLoading(true);
      setHasError(null);

      try {
        const data =
          environment.IVITE_VERCEL === "Y"
            ? mapStaffUserAccountApiToEntity(dataStaff)
            : await staffUserAccountById(userAccountId);
        setUserAccount(data);
        if (onUserAccountLoaded) {
          onUserAccountLoaded(data);
        }
      } catch {
        setHasError(500);
        setFlagShown(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccount();
  }, [userAccountId, onUserAccountLoaded]);

  return { userAccount, loading, hasError };
};
