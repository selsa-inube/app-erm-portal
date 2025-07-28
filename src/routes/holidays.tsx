import { Route, Routes } from "react-router-dom";

import { HolidaysOptions } from "@pages/holidays";
import { RequestEnjoyment } from "@pages/holidays/RequestEnjoyment";
import { RequestPayment } from "@pages/holidays/RequestPayment";
import { useRedirectIfNoEmployee } from "@hooks/useRedirectIfNoEmployee";

import { PrivilegedRoute } from "./privilegedRoute";

function HolidaysRoutes() {
  const selectedEmployee = useRedirectIfNoEmployee();

  if (!selectedEmployee) return null;

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
