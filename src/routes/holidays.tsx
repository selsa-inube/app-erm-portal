import { Route, Routes } from "react-router-dom";

import { HolidaysOptions } from "@pages/holidays";
import { RequestEnjoyment } from "@pages/holidays/RequestEnjoyment";
import { RequestPayment } from "@pages/holidays/RequestPayment";
import { PrivilegedRoute } from "./privilegedRoute";

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
