import { useRef, useState, useEffect } from "react";
import { FormikProps } from "formik";
import { useMediaQuery } from "@inubekit/inubekit";

import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { useErrorFlag } from "@hooks/useErrorFlag";
import { useRequestSubmission } from "@hooks/usePostHumanResourceRequest";
import {
  IUnifiedHumanResourceRequestData,
  ERequestType,
} from "@ptypes/humanResourcesRequest.types";
import { useAppContext } from "@context/AppContext/useAppContext";

import { RequestEnjoymentUI } from "./interface";
import { requestEnjoymentSteps } from "./config/assisted.config";
import { ModalState } from "./types";

function useFormManagement() {
  const { selectedEmployee } = useAppContext();

  const [formValues, setFormValues] =
    useState<IUnifiedHumanResourceRequestData>({
      contractId: "",
      contractNumber: "",
      businessName: "",
      contractType: "",
      observationEmployee: "",
      daysOff: "",
      disbursementDate: "",
      startDateEnyoment: "",
      certificationType: "",
      addressee: "",
    });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);
  const generalInformationRef =
    useRef<FormikProps<IUnifiedHumanResourceRequestData>>(null);

  useEffect(() => {
    const contrato = selectedEmployee?.employmentContracts?.[0];

    if (contrato) {
      setFormValues((prev) => ({
        ...prev,
        contractId: contrato.contractId ?? "",
        contractNumber: contrato.contractNumber ?? "",
        businessName: contrato.businessName ?? "",
        contractType: contrato.contractType ?? "",
      }));
    }
  }, [selectedEmployee]);

  const updateFormValues = () => {
    if (generalInformationRef.current) {
      setFormValues(generalInformationRef.current.values);
      setIsCurrentFormValid(generalInformationRef.current.isValid);
    }
  };

  return {
    formValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    generalInformationRef,
    updateFormValues,
  };
}

function useModalManagement() {
  const [modalState, setModalState] = useState<ModalState>({
    isSendModalVisible: false,
    isRequestInfoModalVisible: false,
  });

  const openSendModal = () =>
    setModalState((prev) => ({ ...prev, isSendModalVisible: true }));

  const closeSendModal = () =>
    setModalState((prev) => ({ ...prev, isSendModalVisible: false }));

  const openInfoModal = () =>
    setModalState({
      isSendModalVisible: false,
      isRequestInfoModalVisible: true,
    });

  const closeInfoModal = () =>
    setModalState((prev) => ({ ...prev, isRequestInfoModalVisible: false }));

  return {
    modalState,
    openSendModal,
    closeSendModal,
    openInfoModal,
    closeInfoModal,
  };
}

function RequestEnjoyment() {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    formValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    generalInformationRef,
    updateFormValues,
  } = useFormManagement();

  const {
    modalState,
    openSendModal,
    closeSendModal,
    openInfoModal,
    closeInfoModal,
  } = useModalManagement();

  const userCodeInCharge = "User 1";
  const userNameInCharge = "Johan Daniel Garcia Nova";

  const {
    requestNum,
    submitRequestHandler,
    navigateAfterSubmission,
    showErrorFlag,
    errorMessage,
    setShowErrorFlag,
  } = useRequestSubmission(
    formValues,
    "VacationsEnjoyed",
    userCodeInCharge,
    userNameInCharge,
  );

  useErrorFlag(showErrorFlag, errorMessage, "Error", false, 10000);

  const handleNextStep = () => {
    if (currentStep) {
      updateFormValues();
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinishAssisted = () => {
    openSendModal();
  };

  const handleConfirmSendModal = async () => {
    setShowErrorFlag(false);
    const isSuccess = await submitRequestHandler();

    if (isSuccess) {
      closeSendModal();
      openInfoModal();
    } else {
      closeSendModal();
    }
  };

  const handleSubmitRequestInfoModal = () => {
    closeInfoModal();
    navigateAfterSubmission("vacations");
  };

  const isTablet = useMediaQuery("(max-width: 1100px)");

  const breadcrumbs = {
    label: "Solicitar disfrute",
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/holidays",
        label: isTablet ? "..." : "Vacaciones",
        id: "/holidays",
        isActive: false,
      },
      {
        path: "/holidays/request-enjoyment",
        label: "Solicitar disfrute",
        id: "/holidays/request-enjoyment",
        isActive: true,
      },
    ],
    url: "/holidays",
  };

  const humanResourceRequestType = ERequestType.VacationsEnjoyed;
  const humanResourceRequestDate = new Date().toISOString();

  return (
    <>
      <RequestEnjoymentUI
        appName={breadcrumbs.label}
        appRoute={breadcrumbs.crumbs}
        navigatePage={breadcrumbs.url}
        steps={requestEnjoymentSteps}
        currentStep={currentStep}
        isTablet={isTablet}
        isCurrentFormValid={isCurrentFormValid}
        generalInformationRef={generalInformationRef}
        initialGeneralInformationValues={formValues}
        humanResourceRequestType={humanResourceRequestType}
        humanResourceRequestDate={humanResourceRequestDate}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        handleFinishAssisted={handleFinishAssisted}
        setIsCurrentFormValid={setIsCurrentFormValid}
        setCurrentStep={setCurrentStep}
      />

      {modalState.isSendModalVisible && (
        <SendRequestModal
          descriptionText="¿Realmente deseas enviar la solicitud de vacaciones?"
          onSubmitButtonClick={handleConfirmSendModal}
          onCloseModal={closeSendModal}
          onSecondaryButtonClick={closeSendModal}
        />
      )}

      {modalState.isRequestInfoModalVisible && (
        <RequestInfoModal
          requestId={requestNum}
          staffName={userNameInCharge ?? ""}
          onCloseModal={handleSubmitRequestInfoModal}
          onSubmitButtonClick={handleSubmitRequestInfoModal}
        />
      )}
    </>
  );
}

export { RequestEnjoyment };
