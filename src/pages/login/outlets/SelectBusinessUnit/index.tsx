import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

import { useAppContext } from "@context/AppContext/useAppContext";
import { IClient } from "@context/AppContext/types";

import { SelectBusinessUnitUI } from "./interface";

function SelectBusinessUnit() {
  const { user, businessUnits, businessUnitsIsFetching, handleClientChange } =
    useAppContext();
  const navigate = useNavigate();

  const checkCredentials = useCallback(() => {
    try {
      if (!user) {
        navigate("/login/error/not-available");
        return;
      }

      if (!businessUnits || businessUnits.length === 0) {
        navigate("/login/error/not-related-clients");
      } else if (businessUnits.length === 1) {
        const singleBusinessUnit = businessUnits[0];
        const selectedClient: IClient = {
          id: singleBusinessUnit.businessUnitPublicCode,
          name: singleBusinessUnit.descriptionUse,
          sigla: singleBusinessUnit.abbreviatedName,
          logo: singleBusinessUnit.urlLogo,
        };

        if (handleClientChange) {
          handleClientChange(selectedClient);
        }

        navigate("/login/loading-app");
      } else {
        navigate(`/login/${user.id}/clients`);
      }
    } catch {
      navigate("/login/error/not-available");
    }
  }, [user, businessUnits, navigate, handleClientChange]);

  useEffect(() => {
    if (!businessUnitsIsFetching) {
      const timer = setTimeout(() => {
        checkCredentials();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [businessUnitsIsFetching, checkCredentials]);

  return <SelectBusinessUnitUI />;
}

export { SelectBusinessUnit };
