import { useState, useMemo } from "react";

import { ContractCardProps } from "@components/cards/ContractCard";
import { useAppContext } from "@context/AppContext";
import { useEmployee } from "@hooks/useEmployee";
import { transformEmploymentContractsToContractCards } from "@mocks/contracts/contracts.mock";
import { useRedirectIfNoEmployee } from "@hooks/useRedirectIfNoEmployee";

import { ContractsNavConfig } from "./config/nav.config";
import { ContractsUI } from "./interface";
import { ModalType } from "./types";

import { labels } from "@i18n/labels";

interface ContractsProps {
  hasPendingRequest?: boolean;
}

function Contracts(props: ContractsProps) {
  const { hasPendingRequest = false } = props;

  const { staffUseCasesData } = useAppContext();
  const selectedEmployee = useRedirectIfNoEmployee();
  if (!selectedEmployee) return null;

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
    if (!contracts || contracts.length === 0) return [];
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
  }>({
    open: false,
    title: labels.contracts.modals.infoTitleDescription,
    description: "",
  });

  const assertNever = (value: string): never => {
    throw new Error(`Unhandled action type: ${value}`);
  };

  const openModal = (modal: ModalType) =>
    setModals((prev) => ({ ...prev, [modal]: true }));
  const closeModal = (modal: ModalType) =>
    setModals((prev) => ({ ...prev, [modal]: false }));

  const handleTerminate = () => openModal("terminate");
  const handleRenew = () => openModal("renew");
  const handleModify = () => openModal("modify");
  const handleAddVinculation = () =>
    window.open("/employees/new-employee", "_blank");

  const handleDetailsClick = (contract: ContractCardProps) => {
    if (!hasDetailsPrivilege) {
      openInfoModal(labels.contracts.modals.noDetailsPrivilege);
      return;
    }
    setSelectedContract(contract);
    openModal("detail");
  };

  const terminationOptions = contractCards
    .filter((c) => c.isContractValid)
    .map((c, i) => ({
      id: i.toString(),
      label: `${c.contractNumber} - ${c.company}`,
      value: i.toString(),
    }));

  const renewOptions = contractCards
    .filter((c) => c.endDate !== "Indefinido")
    .map((c, i) => ({
      id: i.toString(),
      label: `${c.contractNumber} - ${c.company}`,
      value: i.toString(),
    }));

  const modifyOptions = contractCards.map((c, i) => ({
    id: i.toString(),
    label: `${c.contractNumber} - ${c.company}`,
    value: i.toString(),
  }));

  const handleSubmit = (action: ModalType) => () => closeModal(action);

  const openInfoModal = (description: string) => {
    setInfoModal({
      open: true,
      title: labels.contracts.modals.infoTitleDescription,
      description,
    });
  };

  const getActionDescription = (action: string) => {
    switch (action) {
      case "terminate":
        return !hasTerminatePrivilege
          ? labels.contracts.modals.noDetailsPrivilege
          : labels.contracts.modals.noTerminateContract;
      case "renew":
        if (!hasRenewPrivilege)
          return labels.contracts.modals.noDetailsPrivilege;
        if (!hasFixedEndDate)
          return labels.contracts.modals.noFixedTermContract;
        return labels.contracts.modals.noRenewContract;
      case "modify":
        return !hasModifyPrivilege
          ? labels.contracts.modals.noDetailsPrivilege
          : labels.contracts.modals.noModifyContract;
      case "add":
        return !hasAddEmployeeLinkPrivilege
          ? labels.contracts.infoModal.addVinculationDisabled
          : labels.contracts.modals.addVinculationBlocked;
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
