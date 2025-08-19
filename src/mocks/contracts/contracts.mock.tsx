import { ContractCardProps } from "@components/cards/ContractCard";
import { currencyFormat } from "@utils/forms/currency";
import { formatDate } from "@utils/date";
import { capitalizeWords } from "@utils/text";
import {
  ContractRemunerationAssignment,
  Employee,
  EmploymentContract,
} from "@ptypes/employeePortalConsultation.types";

import {
  contractTypeLabels,
  workScheduleLabels,
  workplaceLabels,
} from "@ptypes/labels.types";

const FORMALIZED_STATUS = "Formalized";
const IN_PROCESS_OF_ENDING_STATUS = "InTheProcessOfEnding";
const PAYMENT_CURRENCY_CODE = "0001";
const INDEFINITE_CONTRACT_TEXT = "Indefinido";

const isContractActive = (status: string, deadline: string): boolean => {
  if (status !== FORMALIZED_STATUS) return false;

  if (!deadline) return true;

  const currentDate = new Date();
  const endDate = new Date(deadline);
  return endDate > currentDate;
};

const extractPaymentCurrency = (
  assignments: ContractRemunerationAssignment[],
): string => {
  if (!assignments?.length) return "";

  const primaryAssignment = assignments.find(
    (assignment) => assignment.currencyCodeForPayment === PAYMENT_CURRENCY_CODE,
  );

  return primaryAssignment?.currencyNameForPayment ?? "";
};

const isIndefiniteContract = (contractType: string): boolean => {
  const type = contractType.toLowerCase();
  return type.includes("indefinido") || type.includes("indefinite");
};

const calculateEndDate = (
  deadline: string,
  contractType: string,
  isActive: boolean,
): string => {
  if (isActive || !deadline || isIndefiniteContract(contractType)) {
    return INDEFINITE_CONTRACT_TEXT;
  }

  return formatDate(deadline);
};

const getRetirementInfo = (
  contractStatus: string,
  deadline: string,
  isActive: boolean,
) => {
  if (isActive) return {};

  return {
    retirementDate: formatDate(deadline),
    retirementReason:
      contractStatus === IN_PROCESS_OF_ENDING_STATUS
        ? "En proceso de finalización"
        : "Contrato finalizado",
  };
};

const getLocalizedLabel = (
  value: string,
  labelMap: Record<string, string>,
): string => {
  return labelMap[value] ?? value;
};

export const transformEmploymentContractsToContractCards = (
  employmentContracts: EmploymentContract[],
  selectedEmployee: Employee,
): ContractCardProps[] => {
  return employmentContracts.map((contract) =>
    transformSingleContract(contract, selectedEmployee),
  );
};

const transformSingleContract = (
  contract: EmploymentContract,
  selectedEmployee?: Employee,
): ContractCardProps => {
  const isActive = isContractActive(contract.contractStatus, contract.deadline);
  const paymentCurrency = extractPaymentCurrency(
    contract.contractRemunerationAssignments,
  );

  const positions = selectedEmployee?.positionsByEmployeeAndCompany;
  const positionName = positions?.[positions.length - 1]?.positionName;

  const baseContractData: ContractCardProps = {
    contractNumber: parseInt(contract.contractNumber, 10),
    isContractValid: isActive,
    startDate: formatDate(contract.startDate),
    endDate: calculateEndDate(
      contract.deadline,
      contract.contractType,
      isActive,
    ),
    lastCharge: positionName ?? "No aplica",
    lastSalary: currencyFormat(Number(paymentCurrency)),
    contractType: getLocalizedLabel(contract.contractType, contractTypeLabels),
    normativeFramework: contract.regulatoryFrameworkName,
    company: capitalizeWords(contract.businessName),
    workplace: getLocalizedLabel(contract.jobModality, workplaceLabels),
    formalizationDate: formatDate(contract.formalizedStartDate),
    workSchedule: getLocalizedLabel(contract.workSchedule, workScheduleLabels),
    salaryProfile: paymentCurrency,
  };

  const retirementInfo = getRetirementInfo(
    contract.contractStatus,
    contract.deadline,
    isActive,
  );

  return {
    ...baseContractData,
    ...retirementInfo,
  };
};
