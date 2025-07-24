import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { CertificationsOptions } from "@pages/certifications";
import { NewCertification } from "@pages/certifications/NewCertification";
import { useAppContext } from "@context/AppContext";

import { PrivilegedRoute } from "./privilegedRoute";

function CertificationsRoutes() {
  const { selectedEmployee } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedEmployee) {
      navigate("/employees/select-employee", { replace: true });
    }
  }, [selectedEmployee, navigate]);

  if (!selectedEmployee) {
    return null;
  }
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
