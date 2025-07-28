import { Route, Routes } from "react-router-dom";

import { CertificationsOptions } from "@pages/certifications";
import { NewCertification } from "@pages/certifications/NewCertification";
import { useRedirectIfNoEmployee } from "@hooks/useRedirectIfNoEmployee";

import { PrivilegedRoute } from "./privilegedRoute";

function CertificationsRoutes() {
  const selectedEmployee = useRedirectIfNoEmployee();

  if (!selectedEmployee) return null;
  return (
    <Routes>
      <Route path="/" element={<CertificationsOptions />} />

      <Route
        path="/new-certification"
        element={
          <PrivilegedRoute requiredPrivilege="RequestCertificate">
            <NewCertification />
          </PrivilegedRoute>
        }
      />
    </Routes>
  );
}

export { CertificationsRoutes };
