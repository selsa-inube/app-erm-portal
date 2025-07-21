import { Route, Routes } from "react-router-dom";

import { CertificationsOptions } from "@pages/certifications";
import { NewCertification } from "@pages/certifications/NewCertification";
import { PrivilegedRoute } from "./privilegedRoute";

function CertificationsRoutes() {
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
