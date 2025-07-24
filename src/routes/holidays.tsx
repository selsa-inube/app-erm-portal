import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { HolidaysOptions } from "@pages/holidays";
import { RequestEnjoyment } from "@pages/holidays/RequestEnjoyment";
import { RequestPayment } from "@pages/holidays/RequestPayment";
import { useAppContext } from "@context/AppContext";

import { PrivilegedRoute } from "./privilegedRoute";

function HolidaysRoutes() {
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
