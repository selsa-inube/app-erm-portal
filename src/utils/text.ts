import { contractTypeLabels } from "@ptypes/labels.types";

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function capitalizeWords(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const capitalizeText = (text: string) => {
  const textTowerCase = text.toLowerCase();
  return text.charAt(0).toUpperCase() + textTowerCase.slice(1);
};

const transformContractValue = (
  contractId: string,
  businessName: string,
  contractType: string,
): string => {
  if (!contractId) return `${contractId} - ${businessName}`;

  const contractTypeKey = Object.keys(contractTypeLabels).find((key) =>
    contractId.includes(key),
  );

  if (contractTypeKey) {
    const label = contractTypeLabels[contractTypeKey];
    return `${label} (${contractId}) - ${businessName}`;
  }

  return `${contractId} - ${businessName} - ${contractType}`;
};

export { capitalizeText, transformContractValue };
