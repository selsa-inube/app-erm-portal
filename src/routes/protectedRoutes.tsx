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
        <Route path="holidays/*" element={<HolidaysRoutes />} />
        <Route path="certifications/*" element={<CertificationsRoutes />} />
        <Route path="contracts/*" element={<Contracts />} />
        <Route path="requests/*" element={<RequestsRoutes />} />
      </Route>
      <Route
        path="/employees/*"
        element={<ProtectedAppPage withNav={false} withBanner={false} />}
      >
        <Route path="*" element={<EmployeesRoutes />} />
      </Route>
      <Route path="logout" element={<LogOut />} />
      <Route path="*" element={<ProtectedAppPage />} />
    </>,
  ),
);
