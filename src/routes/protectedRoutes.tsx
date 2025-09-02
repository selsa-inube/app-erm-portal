import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ErrorPage } from "@components/layout/ErrorPage";
import { LoginRoutes } from "@routes/login";
import { RequestsRoutes } from "@routes/requests";
import { FirstPage } from "@pages/firstPage";
import { LogOut } from "@pages/logOut";
import { Home } from "@pages/home";
import { Contracts } from "@pages/contracts";

import { ProtectedAppPage } from "src/ProtectedAppPage";
import { HolidaysRoutes } from "./holidays";
import { CertificationsRoutes } from "./certifications";
import { EmployeesRoutes } from "./employees";
import { ApprovalsRoutes } from "./approvals";

import { ProtectedRoute } from "@pages/protectedRoutes/ProtectedRouteUrl";

export const protectedRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={<FirstPage />}
        errorElement={<ErrorPage />}
      />
      <Route path="/" element={<Home />} />
      <Route path="/login/*" element={<LoginRoutes />} />

      <Route path="/*" element={<ProtectedAppPage />}>
        <Route
          path="holidays/*"
          element={
            <ProtectedRoute
              element={<HolidaysRoutes />}
              optionCode="holidays"
            />
          }
        />
        <Route
          path="certifications/*"
          element={
            <ProtectedRoute
              element={<CertificationsRoutes />}
              optionCode="certifications"
            />
          }
        />
        <Route
          path="contracts/*"
          element={
            <ProtectedRoute element={<Contracts />} optionCode="contracts" />
          }
        />
        <Route
          path="requests/*"
          element={
            <ProtectedRoute
              element={<RequestsRoutes />}
              optionCode="requests"
            />
          }
        />
        <Route
          path="absences/*"
          element={<ProtectedRoute element={<></>} optionCode="absences" />}
        />
        <Route
          path="disability/*"
          element={<ProtectedRoute element={<></>} optionCode="disability" />}
        />
        <Route
          path="charges/*"
          element={<ProtectedRoute element={<></>} optionCode="charges" />}
        />

        <Route
          path="*"
          element={<ProtectedRoute element={<></>} enforcePrivilegeCheck />}
        />
      </Route>
      <Route
        path="/employees/*"
        element={<ProtectedAppPage withNav={false} withBanner={false} />}
      >
        <Route path="*" element={<EmployeesRoutes />} />
      </Route>

      <Route
        path="/approvals/*"
        element={
          <ProtectedAppPage withNav={false} withBanner={false} fullWidth />
        }
      >
        <Route path="*" element={<ApprovalsRoutes />} />
      </Route>

      <Route path="logout" element={<LogOut />} />
      <Route
        path="*"
        element={<ProtectedRoute element={<ProtectedAppPage />} />}
      />
    </>,
  ),
);
