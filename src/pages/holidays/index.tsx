import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { useHumanResourceRequests } from "@hooks/useHumanResourceRequests";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { useErrorFlag } from "@hooks/useErrorFlag";

import { formatHolidaysData } from "./config/table.config";
import { HolidaysOptionsUI } from "./interface";
import { breadcrumbs } from "./config/nav.config";
import { IHolidaysTable } from "./components/HolidaysTable/types";

function HolidaysOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { data: enjoyedData, isLoading: isLoadingEnjoyed } =
    useHumanResourceRequests<IHolidaysTable>(
      formatHolidaysData,
      "VacationsEnjoyed",
    );

  const { data: paidData, isLoading: isLoadingPaid } =
    useHumanResourceRequests<IHolidaysTable>(
      formatHolidaysData,
      "PaidVacations",
    );

  const [tableData, setTableData] = useState<IHolidaysTable[]>([]);

  const hasActiveContract = true;
  const hasEnjoymentPrivilege = true;
  const hasPaymentPrivilege = true;

  const handleDeleteRequest = (requestId: string, justification: string) => {
    const request = tableData.find((item) => item.requestId === requestId);
    const requestNumber = request?.requestNumber ?? "";
    void handleDelete(requestId, justification, requestNumber);
  };

  const { handleDelete } = useDeleteRequest((filterFn) => {
    setTableData((prev) => prev.filter(filterFn));
  });

  useEffect(() => {
    const combined: IHolidaysTable[] = [...enjoyedData, ...paidData];
    setTableData(combined);
  }, [enjoyedData, paidData]);

  const isLoading = isLoadingEnjoyed ?? isLoadingPaid;

  useEffect(() => {
    if (location.state?.showFlag) {
      const timer = setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.showFlag]);

  useErrorFlag(
    location.state?.showFlag,
    location.state?.flagMessage,
    location.state?.flagTitle,
    location.state?.isSuccess,
  );

  return (
    <HolidaysOptionsUI
      appName={breadcrumbs.label}
      appRoute={breadcrumbs.crumbs}
      navigatePage={breadcrumbs.url}
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
