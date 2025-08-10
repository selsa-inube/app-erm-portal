import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { LoadingAppUI } from "./interface";

function LoadingApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const initialRoute =
        sessionStorage.getItem("initialRoute") ??
        localStorage.getItem("initialRoute");

      const isVacationApprovalRoute = initialRoute?.startsWith(
        "/approvals/vacation-approval",
      );

      if (isVacationApprovalRoute) {
        sessionStorage.removeItem("initialRoute");
        localStorage.removeItem("initialRoute");

        navigate("/approvals/vacation-approval");
      } else {
        navigate("/employees/select-employee");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <LoadingAppUI inLogin />;
}

export { LoadingApp };
