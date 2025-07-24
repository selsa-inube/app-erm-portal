import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Requests } from "@pages/requests";
import { ApplicationProcess } from "@pages/requests/ApplicationProcess";
import { ErrorPage } from "@components/layout/ErrorPage";
import { useAppContext } from "@context/AppContext";

function RequestsRoutes() {
  const { selectedEmployee } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedEmployee) {
      navigate("/login", { replace: true });
    }
  }, [selectedEmployee, navigate]);

  if (!selectedEmployee) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<Requests />} />
      <Route path="/application-process/:id" element={<ApplicationProcess />} />
      <Route path="*" element={<ErrorPage errorCode={404} />} />
    </Routes>
  );
}

export { RequestsRoutes };
