import { useState, useEffect } from "react";

import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";
import { getBusinessUnitsForOfficer } from "@services/businessUnits/getBusinessUnits";
import { useHeaders } from "@hooks/useHeaders";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";

const ERROR_CODE_EMPTY_DATA = 1006;
const ERROR_CODE_FETCH_FAILED = 1008;

export const useBusinessUnits = (
  userAccount: string | undefined,
  portalPublicCode: string | undefined,
) => {
  const [businessUnitsData, setBusinessUnitsData] = useState<IBusinessUnit[]>(
    [],
  );
  const [hasError, setHasError] = useState(false);
  const [codeError, setCodeError] = useState<number | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const { getHeaders } = useHeaders();
  const { showErrorModal } = useErrorModal();

  useEffect(() => {
    let isMounted = true;

    if (!userAccount || !portalPublicCode) {
      if (isMounted) {
        setBusinessUnitsData([]);
        setHasError(false);
        setIsFetching(false);
        setErrorMessage(undefined);
        setCodeError(undefined);
      }
      return;
    }

    const fetchBusinessUnits = async () => {
      setIsFetching(true);

      try {
        const headers = await getHeaders();

        const fetchedBusinessUnits = await getBusinessUnitsForOfficer(
          userAccount,
          portalPublicCode,
          headers,
        );

        if (isMounted) {
          if (!fetchedBusinessUnits || fetchedBusinessUnits.length === 0) {
            setHasError(true);
            setCodeError(ERROR_CODE_EMPTY_DATA);
            setBusinessUnitsData([]);
            setErrorMessage(undefined);
          } else {
            setHasError(false);
            setBusinessUnitsData(fetchedBusinessUnits);
            setErrorMessage(undefined);
            setCodeError(undefined);
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("Error al obtener las unidades de negocio:", err);
        if (isMounted) {
          setHasError(true);
          setCodeError(ERROR_CODE_FETCH_FAILED);
          setBusinessUnitsData([]);
          setErrorMessage(msg);
        }
      } finally {
        if (isMounted) {
          setIsFetching(false);
        }
      }
    };

    fetchBusinessUnits();

    return () => {
      isMounted = false;
    };
  }, [userAccount, portalPublicCode]);

  useEffect(() => {
    if (!isFetching && hasError) {
      const errorConfig = modalErrorConfig[Number(codeError)];
      const extra = errorMessage ? ` ${errorMessage}` : "";
      showErrorModal({
        descriptionText: `${errorConfig.descriptionText} ${extra}`,
        solutionText: errorConfig.solutionText,
      });
    }
  }, [isFetching, hasError, codeError, errorMessage, showErrorModal]);

  return { businessUnitsData, hasError, codeError, isFetching, errorMessage };
};
