import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { getHumanResourceRequests } from "@services/humanResourcesRequest/getHumanResourcesRequest";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { formatHolidaysData } from "./config/table.config";
import { HolidaysOptionsUI } from "./interface";
import { holidaysNavConfig } from "./config/nav.config";
import { IHolidaysTable } from "./components/HolidaysTable/types";

function HolidaysOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState<IHolidaysTable[]>([]);

  const hasActiveContract = true;
  const hasEnjoymentPrivilege = true;
  const hasPaymentPrivilege = true;

  const mainNavItem = holidaysNavConfig[0];

  const fetchHolidaysData = async () => {
    setIsLoading(true);
    try {
      const requests = await getHumanResourceRequests("vacations", "");
      setTableData(formatHolidaysData(requests ?? []));

      if (location.state?.showFlag) {
        navigate(location.pathname, { replace: true });
      }
    } catch (error) {
      setTableData([]);
      showError(
        error instanceof Error
          ? error.message
          : "An error occurred while fetching data.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const showError = (message: string) => {
    navigate(location.pathname, {
      state: {
        showFlag: true,
        flagMessage: message,
        flagTitle: "Error",
        isSuccess: false,
      },
      replace: true,
    });
  };

  const handleDeleteRequest = (requestId: string, justification: string) => {
    const request = tableData.find((item) => item.requestId === requestId);
    const requestNumber = request?.requestNumber ?? "";
    void handleDelete(requestId, justification, requestNumber);
  };

  const { handleDelete } = useDeleteRequest((filterFn) => {
    setTableData((prev) => prev.filter(filterFn));
  });

  useEffect(() => {
    void fetchHolidaysData();
  }, []);

  useEffect(() => {
    if (location.state?.showFlag) {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.showFlag, navigate, location.pathname]);

  useErrorFlag(
    location.state?.showFlag,
    location.state?.flagMessage,
    location.state?.flagTitle,
    location.state?.isSuccess,
  );

  return (
    <HolidaysOptionsUI
      appName={mainNavItem.label}
      appRoute={mainNavItem.crumbs}
      navigatePage={mainNavItem.url}
      tableData={tableData}
      isLoading={isLoading}
      hasActiveContract={hasActiveContract}
      isMobile={isMobile}
      hasEnjoymentPrivilege={hasEnjoymentPrivilege}
      hasPaymentPrivilege={hasPaymentPrivilege}
      handleDeleteRequest={handleDeleteRequest}
    />
  );
}

export { HolidaysOptions };
