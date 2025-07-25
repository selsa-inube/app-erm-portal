import { useState, useMemo } from "react";

import { ContractCardProps } from "@components/cards/ContractCard";
import { useAppContext } from "@context/AppContext";
import { useEmployee } from "@hooks/useEmployee";
import { transformEmploymentContractsToContractCards } from "@mocks/contracts/contracts.mock";

import { ContractsNavConfig } from "./config/nav.config";
import { ContractsUI } from "./interface";
import { ModalType } from "./types";

interface ContractsProps {
  hasPendingRequest?: boolean;
}

function Contracts(props: ContractsProps) {
  const { hasPendingRequest = false } = props;

  const { selectedEmployee, staffUseCasesData } = useAppContext();

  const hasTerminatePrivilege =
    staffUseCasesData?.listOfUseCases?.includes("TerminateContract") ?? false;

  const hasRenewPrivilege =
    staffUseCasesData?.listOfUseCases?.includes("RenewContract") ?? false;

  const hasModifyPrivilege =
    staffUseCasesData?.listOfUseCases?.includes("ModifyContract") ?? false;

  const hasAddEmployeeLinkPrivilege =
    staffUseCasesData?.listOfUseCases?.includes("AddEmployeeLink") ?? false;

  const hasDetailsPrivilege =
    staffUseCasesData?.listOfUseCases?.includes("CheckContractDetails") ??
    false;

  const { employee } = useEmployee(selectedEmployee.employeeId);
  const contracts = employee?.employmentContracts ?? [];

  const contractCards = useMemo(() => {
    if (!contracts || contracts.length === 0) {
      return [];
    }
    return transformEmploymentContractsToContractCards(
      contracts,
      selectedEmployee,
    );
  }, [contracts, selectedEmployee]);

  const hasFixedEndDate = contractCards.some(
    (contract) => contract.endDate !== "Indefinido",
  );

  const sortedContracts = [...contractCards].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  const hasValidContract = contractCards.some(
    (contract) => contract.isContractValid,
  );

  const [modals, setModals] = useState<Record<ModalType, boolean>>({
    terminate: false,
    renew: false,
    modify: false,
    detail: false,
  });
  const [selectedContract, setSelectedContract] = useState<ContractCardProps>();

  const [infoModal, setInfoModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({ open: false, title: "Información", description: "" });

  const assertNever = (value: string): never => {
    throw new Error(`Unhandled action type: ${value}`);
  };

  const openModal = (modal: ModalType) =>
    setModals((prev) => ({ ...prev, [modal]: true }));

  const closeModal = (modal: ModalType) =>
    setModals((prev) => ({ ...prev, [modal]: false }));

  const handleTerminate = () => {
    openModal("terminate");
  };

  const handleRenew = () => {
    openModal("renew");
  };

  const handleModify = () => {
    openModal("modify");
  };

  const handleAddVinculation = () => {
    window.open("/employees/new-employee", "_blank");
  };

  const handleDetailsClick = (contract: ContractCardProps) => {
    if (!hasDetailsPrivilege) {
      openInfoModal("No tiene privilegios para ver los detalles del contrato.");
      return;
    }

    setSelectedContract(contract);
    openModal("detail");
  };

  const terminationOptions = contractCards
    .filter((contract) => contract.isContractValid)
    .map((contract, index) => ({
      id: index.toString(),
      label: `${contract.contractNumber} - ${contract.company}`,
      value: index.toString(),
    }));

  const renewOptions = contractCards
    .filter((contract) => contract.endDate !== "Indefinido")
    .map((contract, index) => ({
      id: index.toString(),
      label: `${contract.contractNumber} - ${contract.company}`,
      value: index.toString(),
    }));

  const modifyOptions = contractCards.map((contract, index) => ({
    id: index.toString(),
    label: `${contract.contractNumber} - ${contract.company}`,
    value: index.toString(),
  }));

  const handleSubmit = (action: ModalType) => () => {
    closeModal(action);
  };

  const openInfoModal = (description: string) => {
    setInfoModal({ open: true, title: "Información", description });
  };

  const getActionDescription = (action: string) => {
    switch (action) {
      case "terminate":
        return !hasTerminatePrivilege
          ? "No tiene privilegios para terminar contratos."
          : "No hay contrato vigente para terminar.";
      case "renew":
        return !hasRenewPrivilege
          ? "No tiene privilegios para renovar contratos."
          : !hasFixedEndDate
            ? "No hay contrato a término fijo."
            : "No hay contrato vigente para renovar.";
      case "modify":
        return !hasModifyPrivilege
          ? "No tiene privilegios para modificar contratos."
          : "No hay contrato vigente para modificar.";
      case "add":
        return !hasAddEmployeeLinkPrivilege
          ? "No se puede agregar vinculación, ya que no tiene privilegios para ejecutar esta acción."
          : "No se puede agregar vinculación.";
      default:
        return assertNever(action);
    }
  };

  const actionDescriptions = {
    Terminar: getActionDescription("terminate"),
    Renovar: getActionDescription("renew"),
    Modificar: getActionDescription("modify"),
    Agregar: getActionDescription("add"),
  };

  return (
    <ContractsUI
      appName={ContractsNavConfig[0].label}
      appRoute={ContractsNavConfig[0].crumbs}
      navigatePage={ContractsNavConfig[0].url}
      hasValidContract={hasValidContract}
      hasFixedEndDate={hasFixedEndDate}
      sortedContracts={sortedContracts}
      modals={modals}
      selectedContract={selectedContract}
      infoModal={infoModal}
      terminationOptions={terminationOptions}
      renewOptions={renewOptions}
      modifyOptions={modifyOptions}
      actionDescriptions={actionDescriptions}
      hasPendingRequest={hasPendingRequest}
      canCreateRequest={hasAddEmployeeLinkPrivilege}
      canTerminate={hasTerminatePrivilege}
      canRenew={hasRenewPrivilege}
      canModify={hasModifyPrivilege}
      onTerminate={handleTerminate}
      onRenew={handleRenew}
      onModify={handleModify}
      onAddVinculation={handleAddVinculation}
      onDetailsClick={handleDetailsClick}
      onOpenModal={openModal}
      onCloseModal={closeModal}
      onSubmit={handleSubmit}
      onOpenInfoModal={openInfoModal}
      onSetInfoModal={setInfoModal}
    />
  );
}

export { Contracts };
