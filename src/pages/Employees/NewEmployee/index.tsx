import { useRef, useState } from "react";
import { FormikProps } from "formik";

import {
  ERequestType,
  IUnifiedHumanResourceRequestData,
} from "@ptypes/humanResourcesRequest.types";
import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { AlertCardProps } from "@components/data/AlertCard";
import { mockAlertCards } from "@mocks/requirements/requirements-2.mock";
import { useRequestSubmission } from "@hooks/usePostHumanResourceRequest";

import { NewEmployeeUI } from "./interface";
import { newEmployeeSteps } from "./config/assisted.config";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";
import { IContractualPositionData } from "./forms/ContractualPositionDataForm/types";
import { ILegalAccountingLocation } from "./forms/LegalAccountingLocationForm/types";
import { IAssignment, ModalState } from "./types";

function useFormManagement() {
  type FormValues = IPersonalDataEntry &
    IContractualPositionData &
    ILegalAccountingLocation & {
      assignments: IAssignment[];
    } & Pick<
      IUnifiedHumanResourceRequestData,
      "contractId" | "contractNumber" | "businessName" | "observationEmployee"
    >;

  const [formValues, setFormValues] = useState<FormValues>({
    id: "",
    identificationNumber: "",
    lastNames: "",
    names: "",
    attachedFile: undefined,

    normativeFramework: "",
    contractType: "",
    startDate: "",
    endDate: "",
    company: "",
    workingShift: "",
    team: "",
    position: "",
    salaryProfile: "",
    jobMode: "",

    proyect: "",
    zonalSegmentation: "",
    costCenter: "",

    contractId: "",
    contractNumber: "",
    businessName: "",
    observationEmployee: "",

    assignments: [
      {
        title: "Asignación 1",
        assignment: "Salario básico",
        value: "$ 1.800.000",
      },
      {
        title: "Asignación 2",
        assignment: "Auxilio de conectividad",
        value: "$ 240.000",
      },
    ],
  });

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const personalDataRef = useRef<FormikProps<IPersonalDataEntry>>(null);
  const contractualPositionDataFormRef =
    useRef<FormikProps<IContractualPositionData>>(null);
  const legalAccountingLocationFormRef =
    useRef<FormikProps<ILegalAccountingLocation>>(null);

  const updateFormValues = (currentStep: number) => {
    if (currentStep === 1 && personalDataRef.current) {
      setFormValues((prev) => ({
        ...prev,
        ...personalDataRef.current!.values,
      }));
      setIsCurrentFormValid(personalDataRef.current.isValid);
    }

    if (currentStep === 2 && contractualPositionDataFormRef.current) {
      setFormValues((prev) => ({
        ...prev,
        ...contractualPositionDataFormRef.current!.values,
      }));
      setIsCurrentFormValid(contractualPositionDataFormRef.current.isValid);
    }

    if (currentStep === 3 && legalAccountingLocationFormRef.current) {
      setFormValues((prev) => ({
        ...prev,
        ...legalAccountingLocationFormRef.current!.values,
      }));
      setIsCurrentFormValid(legalAccountingLocationFormRef.current.isValid);
    }
  };

  return {
    formValues,
    setFormValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    personalDataRef,
    contractualPositionDataFormRef,
    legalAccountingLocationFormRef,
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

function NewEmployee() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [requirements] = useState<AlertCardProps[]>(mockAlertCards);

  const {
    formValues,
    setFormValues,
    isCurrentFormValid,
    setIsCurrentFormValid,
    personalDataRef,
    contractualPositionDataFormRef,
    legalAccountingLocationFormRef,
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

  const { requestNum, submitRequestHandler, navigateAfterSubmission } =
    useRequestSubmission(
      formValues,
      ERequestType.onboarding,
      userCodeInCharge,
      userNameInCharge,
    );

  const handleNextStep = () => {
    updateFormValues(currentStep);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      updateFormValues(currentStep);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinishAssisted = () => {
    updateFormValues(currentStep);
    openSendModal();
  };

  const handleConfirmSendModal = async () => {
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
    navigateAfterSubmission("onboarding");
  };

  const handleAssignmentsChange = (assignments: IAssignment[]) => {
    setFormValues((prev) => ({
      ...prev,
      assignments,
    }));
  };

  return (
    <>
      <NewEmployeeUI
        steps={newEmployeeSteps}
        currentStep={currentStep}
        isCurrentFormValid={isCurrentFormValid}
        personalDataRef={personalDataRef}
        initialPersonalDataValues={formValues}
        contractualPositionDataFormRef={contractualPositionDataFormRef}
        initialContractualPositionValues={formValues}
        legalAccountingLocationFormRef={legalAccountingLocationFormRef}
        initialLegalAccountingLocationValues={formValues}
        assignments={formValues.assignments}
        requirements={requirements}
        setCurrentStep={setCurrentStep}
        onAssignmentsChange={handleAssignmentsChange}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        handleFinishAssisted={handleFinishAssisted}
        setIsCurrentFormValid={setIsCurrentFormValid}
      />

      {modalState.isSendModalVisible && (
        <SendRequestModal
          title="Finalizar solicitud"
          descriptionText="¿Deseas enviar la solicitud de vinculación?"
          buttonText="Enviar solicitud"
          onSubmitButtonClick={handleConfirmSendModal}
          onCloseModal={closeSendModal}
          onSecondaryButtonClick={closeSendModal}
        />
      )}

      {modalState.isRequestInfoModalVisible && (
        <RequestInfoModal
          iconAppearance="success"
          requestId={requestNum}
          staffName={userNameInCharge ?? ""}
          onCloseModal={handleSubmitRequestInfoModal}
          onSubmitButtonClick={handleSubmitRequestInfoModal}
        />
      )}
    </>
  );
}

export { NewEmployee };
