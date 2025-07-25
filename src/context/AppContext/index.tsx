import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  IStaffPortalByBusinessManager,
  IOptionWithSubOptions,
} from "@ptypes/staffPortalBusiness.types";
import selsaLogo from "@assets/images/selsa.png";
import { IStaffUserAccount } from "@ptypes/staffPortalBusiness.types";
import { IBusinessManager } from "@ptypes/employeePortalBusiness.types";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";
import { Employee } from "@ptypes/employeePortalConsultation.types";

import {
  IAppContextType,
  IPreferences,
  IClient,
  IStaffUseCasesData,
} from "./types";

const AppContext = createContext<IAppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  businessManagersData: IBusinessManager;
  dataPortal: IStaffPortalByBusinessManager;
  businessUnitsData: IBusinessUnit[];
}

function AppProvider(props: AppProviderProps) {
  const { children, dataPortal, businessManagersData, businessUnitsData } =
    props;
  const { user: auth0User } = useAuth0();

  const [user, setUser] = useState<{
    username: string;
    id: string;
    company: string;
    urlImgPerfil: string;
  } | null>(
    auth0User
      ? {
          username: auth0User.name ?? "",
          id: "1234567890",
          company: "Company Name",
          urlImgPerfil: auth0User.picture ?? "",
        }
      : null,
  );

  const initialLogo = localStorage.getItem("logoUrl") ?? selsaLogo;
  const [logoUrl, setLogoUrl] = useState<string>(initialLogo);

  const [preferences, setPreferences] = useState<IPreferences>({
    boardOrientation:
      (localStorage.getItem("boardOrientation") as "vertical" | "horizontal") ??
      "vertical",
    showPinnedOnly: false,
  });

  const [staffUser, setStaffUser] = useState<IStaffUserAccount>(() => {
    const storedStaffUser = localStorage.getItem("staffUser");
    if (storedStaffUser) {
      try {
        return JSON.parse(storedStaffUser);
      } catch (error) {
        console.error("Error al parsear staffUser desde localStorage", error);
      }
    }
    return {} as IStaffUserAccount;
  });

  useEffect(() => {
    if (staffUser && Object.keys(staffUser).length > 0) {
      localStorage.setItem("staffUser", JSON.stringify(staffUser));
    } else {
      localStorage.removeItem("staffUser");
    }
  }, [staffUser]);

  const [provisionedPortal, setProvisionedPortal] =
    useState<IStaffPortalByBusinessManager>(dataPortal);
  const [businessManagers, setBusinessManagers] =
    useState<IBusinessManager>(businessManagersData);
  const [businessUnits, setBusinessUnits] =
    useState<IBusinessUnit[]>(businessUnitsData);
  const [businessUnitsIsFetching, setBusinessUnitsIsFetching] =
    useState<boolean>(false);
  const [optionForCustomerPortal, setOptionForCustomerPortal] = useState<
    IOptionWithSubOptions[] | null
  >(() => {
    const storedOption = localStorage.getItem("optionForCustomerPortal");
    if (storedOption) {
      try {
        return JSON.parse(storedOption);
      } catch (error) {
        console.error(
          "Error al parsear optionForCustomerPortal desde localStorage",
          error,
        );
      }
    }
    return null;
  });
  useEffect(() => {
    if (optionForCustomerPortal) {
      localStorage.setItem(
        "optionForCustomerPortal",
        JSON.stringify(optionForCustomerPortal),
      );
    } else {
      localStorage.removeItem("optionForCustomerPortal");
    }
  }, [optionForCustomerPortal]);

  const [selectedClient, setSelectedClient] = useState<IClient | null>(() => {
    const storedClient = localStorage.getItem("selectedClient");
    if (storedClient) {
      try {
        return JSON.parse(storedClient);
      } catch (error) {
        console.error(
          "Error al parsear selectedClient desde localStorage",
          error,
        );
      }
    }
    return null;
  });

  useEffect(() => {
    if (selectedClient) {
      localStorage.setItem("selectedClient", JSON.stringify(selectedClient));
    } else {
      localStorage.removeItem("selectedClient");
    }
  }, [selectedClient]);

  const handleClientChange = (client: IClient) => {
    setSelectedClient(client);
  };

  const updatePreferences = (newPreferences: Partial<IPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("logoUrl", logoUrl);
      localStorage.setItem("boardOrientation", preferences.boardOrientation);
    }
  }, [logoUrl, preferences, user]);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(() => {
    const storedEmployee = localStorage.getItem("selectedEmployee");
    return storedEmployee ? JSON.parse(storedEmployee) : null;
  });

  useEffect(() => {
    if (selectedEmployee) {
      localStorage.setItem(
        "selectedEmployee",
        JSON.stringify(selectedEmployee),
      );
    } else {
      localStorage.removeItem("selectedEmployee");
    }
  }, [selectedEmployee]);

  const [staffUseCasesData, setStaffUseCasesData] =
    useState<IStaffUseCasesData | null>(() => {
      const storedUseCasesData = localStorage.getItem("staffUseCasesData");
      return storedUseCasesData ? JSON.parse(storedUseCasesData) : null;
    });

  useEffect(() => {
    if (staffUseCasesData) {
      localStorage.setItem(
        "staffUseCasesData",
        JSON.stringify(staffUseCasesData),
      );
    } else {
      localStorage.removeItem("staffUseCasesData");
    }
  }, [staffUseCasesData]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        preferences,
        updatePreferences,
        logoUrl,
        setLogoUrl,
        handleClientChange,
        provisionedPortal,
        setProvisionedPortal,
        staffUser,
        setStaffUser,
        businessManagers,
        setBusinessManagers,
        businessUnits,
        setBusinessUnits,
        businessUnitsIsFetching,
        setBusinessUnitsIsFetching,
        selectedClient,
        setSelectedClient,
        employees,
        setEmployees,
        selectedEmployee,
        setSelectedEmployee,
        optionForCustomerPortal,
        setOptionForCustomerPortal,
        staffUseCasesData,
        setStaffUseCasesData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, AppContext, useAppContext };
