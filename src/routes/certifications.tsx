import { Route, Routes } from "react-router-dom";

import { CertificationsOptions } from "@pages/certifications";
import { NewCertification } from "@pages/certifications/NewCertification";
import { useAppContext } from "@context/AppContext";

function PrivilegedRoute({
  children,
  requiredPrivilege,
}: {
  children: React.ReactNode;
  requiredPrivilege: string;
}) {
  const { staffUseCasesData } = useAppContext();

  const hasPrivilege =
    Array.isArray(staffUseCasesData?.listOfUseCases) &&
    staffUseCasesData.listOfUseCases.includes(requiredPrivilege);

  if (!hasPrivilege) {
    return <></>;
  }

  return <>{children}</>;
}

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
