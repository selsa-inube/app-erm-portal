import { Routes, Route } from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { SelectEmployeePage } from "@pages/Employees/SelectEmployee";
import { NewEmployee } from "@pages/Employees/NewEmployee";
import { PrivilegedRoute } from "./privilegedRoute";

function EmployeesRoutes() {
  return (
    <Routes>
      <Route path="select-employee" element={<SelectEmployeePage />} />
      <Route
        path="new-employee"
        element={
          <PrivilegedRoute requiredPrivilege="AddEmployeeLink">
            <NewEmployee />
          </PrivilegedRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export { EmployeesRoutes };
