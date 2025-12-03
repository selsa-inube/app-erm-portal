import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";

import { SendRequestModal } from "@components/modals/SendRequestModal";
import { RequestInfoModal } from "@components/modals/RequestInfoModal";
import { AlertCardProps } from "@components/data/AlertCard";
import { mockAlertCards } from "@mocks/requirements/requirements-2.mock";
import { labels } from "@i18n/labels";

import { NewEmployeeUI } from "./interface";
import { newEmployeeSteps } from "./config/assisted.config";
import { IPersonalDataEntry } from "./forms/PersonalDataForm/types";
import { IContractualPositionData } from "./forms/ContractualPositionDataForm/types";
import { ILegalAccountingLocation } from "./forms/LegalAccountingLocationForm/types";
import { IAssignment, ModalState } from "./types";

function NewEmployee() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [personalData, setPersonalData] = useState<IPersonalDataEntry>({
    id: "",
    identificationNumber: "",
    lastNames: "",
    names: "",
    attachedFile: undefined,
  });

  const [contractualPositionData, setContractualPositionData] =
    useState<IContractualPositionData>({
      id: "",
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
    });

  const [legalAccountingLocation, setLegalAccountingLocation] =
    useState<ILegalAccountingLocation>({
      proyect: "",
      zonalSegmentation: "",
      costCenter: "",
    });

  const [assignments, setAssignments] = useState<IAssignment[]>([
    {
      title: labels.employee.newEmployee.assignments.basicSalary.title,
      assignment:
        labels.employee.newEmployee.assignments.basicSalary.assignment,
      value: "$ 1.800.000",
    },
    {
      title: labels.employee.newEmployee.assignments.connectivitySubsidy.title,
      assignment:
        labels.employee.newEmployee.assignments.connectivitySubsidy.assignment,
      value: "$ 240.000",
    },
  ]);

  const [requirements] = useState<AlertCardProps[]>(mockAlertCards);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const personalDataRef = useRef<FormikProps<IPersonalDataEntry>>(null);
  const contractualPositionDataFormRef =
    useRef<FormikProps<IContractualPositionData>>(null);
  const legalAccountingLocationFormRef =
    useRef<FormikProps<ILegalAccountingLocation>>(null);

  const [modalState, setModalState] = useState<ModalState>({
    isSendModalVisible: false,
    isRequestInfoModalVisible: false,
  });

  const updateFormValues = () => {
    if (currentStep === 1 && personalDataRef.current) {
      setPersonalData(personalDataRef.current.values);
      setIsCurrentFormValid(personalDataRef.current.isValid);
    } else if (currentStep === 2 && contractualPositionDataFormRef.current) {
      setContractualPositionData(contractualPositionDataFormRef.current.values);
      setIsCurrentFormValid(contractualPositionDataFormRef.current.isValid);
    } else if (currentStep === 3 && legalAccountingLocationFormRef.current) {
      setLegalAccountingLocation(legalAccountingLocationFormRef.current.values);
      setIsCurrentFormValid(legalAccountingLocationFormRef.current.isValid);
    }
  };

  const handleNextStep = () => {
    updateFormValues();
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      updateFormValues();
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinishAssisted = () => {
    updateFormValues();
    setModalState((prev) => ({ ...prev, isSendModalVisible: true }));
  };

  const handleCloseSendModal = () => {
    setModalState((prev) => ({ ...prev, isSendModalVisible: false }));
  };

  const handleConfirmSendModal = () => {
    setModalState({
      isSendModalVisible: false,
      isRequestInfoModalVisible: true,
    });
  };

  const handleSubmitRequestInfoModal = () => {
    setModalState((prev) => ({ ...prev, isRequestInfoModalVisible: false }));
    navigate("/employees", {
      state: {
        showFlag: true,
        flagTitle: labels.employee.newEmployee.success.flagTitle,
        flagMessage: labels.employee.newEmployee.success.flagMessage,
        isSuccess: true,
      },
    });
  };

  return (
    <>
      <NewEmployeeUI
        steps={newEmployeeSteps}
        currentStep={currentStep}
        isCurrentFormValid={isCurrentFormValid}
        personalDataRef={personalDataRef}
        initialPersonalDataValues={personalData}
        contractualPositionDataFormRef={contractualPositionDataFormRef}
        initialContractualPositionValues={contractualPositionData}
        legalAccountingLocationFormRef={legalAccountingLocationFormRef}
        initialLegalAccountingLocationValues={legalAccountingLocation}
        assignments={assignments}
        requirements={requirements}
        setCurrentStep={setCurrentStep}
        onAssignmentsChange={setAssignments}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        handleFinishAssisted={handleFinishAssisted}
        setIsCurrentFormValid={setIsCurrentFormValid}
      />

      {modalState.isSendModalVisible && (
        <SendRequestModal
          title={labels.employee.newEmployee.finishModal.title}
          descriptionText={labels.employee.newEmployee.finishModal.description}
          buttonText={labels.employee.newEmployee.finishModal.button}
          onSubmitButtonClick={handleConfirmSendModal}
          onCloseModal={handleCloseSendModal}
          onSecondaryButtonClick={handleCloseSendModal}
        />
      )}

      {modalState.isRequestInfoModalVisible && (
        <RequestInfoModal
          iconAppearance="success"
          requestId="##45678822"
          staffName="Nombre Apellido"
          onCloseModal={handleSubmitRequestInfoModal}
          onSubmitButtonClick={handleSubmitRequestInfoModal}
        />
      )}
    </>
  );
}

export { NewEmployee };
