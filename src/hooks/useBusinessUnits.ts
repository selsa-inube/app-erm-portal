import { useState, useEffect } from "react";

import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";

import { useErrorFlag } from "./useErrorFlag";
import { businessUnitStaff } from "@src/mocks/staff/staff.mock";
import { mapBusinessUnitsApiToEntity } from "@src/services/businessUnits/getBusinessUnits/mappers";

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
  const [flagShown, setFlagShown] = useState(false);

  useErrorFlag(flagShown);

  useEffect(() => {
    let isMounted = true;

    if (!userAccount || !portalPublicCode) {
      if (isMounted) {
        setBusinessUnitsData([]);
        setHasError(false);
        setIsFetching(false);
      }
      return;
    }

    const fetchBusinessUnits = () => {
      setIsFetching(true);

      try {
        /*const headers = await getHeaders();

         const fetchedBusinessUnits = await getBusinessUnitsForOfficer(
          userAccount,
          portalPublicCode,
          headers,
        ); */

        // Simulación de datos obtenidos
        const fetchedBusinessUnits = businessUnitStaff.map(
          mapBusinessUnitsApiToEntity,
        );

        if (isMounted) {
          if (!fetchedBusinessUnits || fetchedBusinessUnits.length === 0) {
            setHasError(true);
            setCodeError(ERROR_CODE_EMPTY_DATA);
            setBusinessUnitsData([]);
          } else {
            setHasError(false);
            setBusinessUnitsData(fetchedBusinessUnits);
          }
        }
      } catch (error) {
        console.error("Error al obtener las unidades de negocio:", error);
        if (isMounted) {
          setHasError(true);
          setCodeError(ERROR_CODE_FETCH_FAILED);
          setBusinessUnitsData([]);
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
      if (
        codeError === ERROR_CODE_EMPTY_DATA ||
        codeError === ERROR_CODE_FETCH_FAILED
      ) {
        window.location.href = "/logout";
      } else {
        setFlagShown(true);
      }
    } else {
      setFlagShown(false);
    }
  }, [isFetching, hasError, codeError]);

  return { businessUnitsData, hasError, codeError, isFetching };
};
