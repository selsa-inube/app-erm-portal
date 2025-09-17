import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useIAuth } from "@inube/iauth-react";

import { ErrorPage } from "@components/layout/ErrorPage";
import { usePortalAuth } from "@hooks/usePortalAuth";
import { GlobalStyles } from "@styles/global";
import { AppProvider } from "@context/AppContext";
import { LoadingAppUI } from "@pages/login/outlets/LoadingApp/interface";
import { protectedRouter } from "@routes/protectedRoutes";

import { BusinessUnitsLoader } from "src/BusinessUnitsLoader";

export function ProtectedRoutes() {
  const {
    portalCode,
    portalData,
    authConfig,
    hasAuthError,
    errorCode,
    hasPortalError,
    hasManagersError,
    businessManagersData,
  } = usePortalAuth();

  const { loginWithRedirect, isAuthenticated, isLoading } = useIAuth();

  if (!portalCode) {
    return <ErrorPage errorCode={1001} />;
  }

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;
      const fullPath = currentPath + currentSearch;

      sessionStorage.setItem("initialRoute", fullPath);
      localStorage.setItem("initialRoute", fullPath);
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      !hasPortalError &&
      !hasManagersError &&
      authConfig
    ) {
      loginWithRedirect();
    }
  }, [
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    hasPortalError,
    hasManagersError,
    authConfig,
  ]);

  if (isLoading || hasAuthError === null || !authConfig) {
    return <LoadingAppUI />;
  }

  if (hasAuthError) {
    return <ErrorPage errorCode={errorCode ?? 1001} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppProvider
      dataPortal={portalData}
      businessManagersData={businessManagersData}
      businessUnitsData={[]}
    >
      <GlobalStyles />
      <BusinessUnitsLoader portalCode={portalCode} />
      <RouterProvider router={protectedRouter} />
    </AppProvider>
  );
}
