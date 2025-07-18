import { Route, Routes } from "react-router-dom";

import { HolidaysOptions } from "@pages/holidays";
import { RequestEnjoyment } from "@pages/holidays/RequestEnjoyment";
import { RequestPayment } from "@pages/holidays/RequestPayment";
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
    staffUseCasesData?.listOfUseCases?.includes(requiredPrivilege) ?? false;

  if (!hasPrivilege) {
    return <></>;
  }

  return <>{children}</>;
}

function HolidaysRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HolidaysOptions />} />

      <Route
        path="/request-payment"
        element={
          <PrivilegedRoute requiredPrivilege="RequestPaymentForVacationDays">
            <RequestPayment />
          </PrivilegedRoute>
        }
      />

      <Route
        path="/request-enjoyment"
        element={
          <PrivilegedRoute requiredPrivilege="RequestToEnjoyVacationDays">
            <RequestEnjoyment />
          </PrivilegedRoute>
        }
      />
    </Routes>
  );
}

export { HolidaysRoutes };
