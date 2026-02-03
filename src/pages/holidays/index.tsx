import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { usePendingVacationRequest } from "@hooks/usePendingVacationRequest";
import { useDeleteRequest } from "@hooks/useDeleteRequest";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useDeleteValidation } from "@hooks/useDeleteValidation";
import { InfoModal } from "@components/modals/InfoModal";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";
import { parseDataSafely, getValueFromData } from "@utils/parser";
import { useAppContext } from "@context/AppContext";

import { formatHolidaysData } from "./config/table.config";
import { HolidaysOptionsUI } from "./interface";
import { breadcrumbs } from "./config/nav.config";
import { IHolidaysTable } from "./components/HolidaysTable/types";

function HolidaysOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { staffUseCasesData, selectedEmployee, staffUser } = useAppContext();

  const isSelfRequest =
    !!selectedEmployee?.identificationDocumentNumber &&
    !!staffUser?.identificationDocumentNumber &&
    selectedEmployee.identificationDocumentNumber ===
      staffUser.identificationDocumentNumber;

  const {
    data: tableData,
    rawData,
    isLoading: isLoadingRequests,
  } = usePendingVacationRequest<IHolidaysTable>(formatHolidaysData);

  const [localTableData, setLocalTableData] = useState<IHolidaysTable[]>([]);

  const hasActiveContract = true;

  const hasEnjoymentPrivilege =
    staffUseCasesData?.listOfUseCases?.includes("RequestToEnjoyVacationDays") ??
    false;

  const hasPaymentPrivilege =
    staffUseCasesData?.listOfUseCases?.includes(
      "RequestPaymentForVacationDays",
    ) ?? false;

  const hasViewDetailsPrivilege =
    staffUseCasesData?.listOfUseCases?.includes("VacationDetailsInProcess") ??
    false;

  const hasDeletePrivilege =
    staffUseCasesData?.listOfUseCases?.includes("DiscardVacationInProcess") ??
    false;

  const { handleDelete } = useDeleteRequest((filterFn) => {
    setLocalTableData((prev) => prev.filter(filterFn));
  });

  const { validateDelete, validationModal, closeValidationModal } =
    useDeleteValidation();

  const handleDeleteRequest = (requestId: string, justification?: string) => {
    const request = localTableData.find((item) => item.requestId === requestId);
    const requestNumber = request?.requestNumber ?? "";

    const originalRequest = rawData.find(
      (req) => req.humanResourceRequestId === requestId,
    );

    let requestData;
    if (originalRequest) {
      const parsedData = parseDataSafely(
        originalRequest.humanResourceRequestData,
      );

      requestData = {
        requestType: originalRequest.humanResourceRequestType as ERequestType,
        disbursementDate: getValueFromData(
          parsedData,
          "disbursementDate",
          null,
        ) as string | null,
      };
    }

    if (!justification) {
      return validateDelete(requestData);
    }

    void handleDelete(requestId, justification, requestNumber);
  };

  useEffect(() => {
    setLocalTableData(tableData);
  }, [tableData]);

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
    <>
      <HolidaysOptionsUI
        appName={breadcrumbs.label}
        appRoute={breadcrumbs.crumbs}
        navigatePage={breadcrumbs.url}
        tableData={tableData}
        isLoading={isLoadingRequests}
        hasActiveContract={hasActiveContract}
        isMobile={isMobile}
        hasEnjoymentPrivilege={hasEnjoymentPrivilege}
        hasPaymentPrivilege={hasPaymentPrivilege}
        hasDeletePrivilege={hasDeletePrivilege}
        hasViewDetailsPrivilege={hasViewDetailsPrivilege}
        handleDeleteRequest={handleDeleteRequest}
        isSelfRequest={isSelfRequest}
      />

      {validationModal.show && (
        <InfoModal
          title={labels.holidays.infoModal.title}
          titleDescription={labels.holidays.infoModal.disabledReasonTitle}
          description={validationModal.message}
          buttonText={labels.holidays.infoModal.confirmButton}
          onCloseModal={closeValidationModal}
        />
      )}
    </>
  );
}

export { HolidaysOptions };
