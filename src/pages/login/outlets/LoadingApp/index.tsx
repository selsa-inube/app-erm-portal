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

      if (isVacationApprovalRoute && initialRoute) {
        sessionStorage.removeItem("initialRoute");
        localStorage.removeItem("initialRoute");

        const urlParts = initialRoute.split("/");
        const requestIdIndex =
          urlParts.findIndex((part) => part === "vacation-approval") + 1;

        if (requestIdIndex < urlParts.length && urlParts[requestIdIndex]) {
          const requestIdWithQuery = urlParts[requestIdIndex];

          const requestId = requestIdWithQuery.split("?")[0];

          if (requestId && requestId.trim() !== "") {
            navigate(`/approvals/vacation-approval/${requestId}`);
          } else {
            navigate("/approvals/vacation-approval");
          }
        } else {
          navigate("/approvals/vacation-approval");
        }
      } else {
        navigate("/employees/select-employee");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <LoadingAppUI inLogin />;
}

export { LoadingApp };
