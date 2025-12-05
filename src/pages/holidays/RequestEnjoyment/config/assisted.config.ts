import { IAssistedStep, IOption } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";

export const requestEnjoymentSteps: IAssistedStep[] = [
  {
    id: 1,
    number: 1,
    name: labels.holidays.titles.requirements,
    description: labels.holidays.assisted.previous,
  },
  {
    id: 2,
    number: 2,
    name: labels.holidays.titles.daysUsedQuery,
    description: labels.holidays.generalInformationForm.fields.daysToPay.label,
  },
  {
    id: 3,
    number: 3,
    name: labels.holidays.titles.pendingRequests,
    description: labels.holidays.verification.backToStep,
  },
];

export const certificationOptions: IOption[] = [
  {
    id: "1",
    label: labels.holidays.actions.addEnjoyment,
    value: "certificado de servidor",
  },
  {
    id: "2",
    label: labels.holidays.actions.addPayment,
    value: "certificado de pertenencia a empresa",
  },
  {
    id: "3",
    label: labels.holidays.actions.requestPayment,
    value: "certificado de representante",
  },
];

export const contractOptions: IOption[] = [
  {
    id: "1",
    label: labels.holidays.generalInformationForm.fields.contract.label,
    value: "contrato por obra o labor",
  },
  {
    id: "2",
    label: labels.holidays.generalInformationForm.fields.contract.label,
    value: "contrato de trabajo a término fijo",
  },
  {
    id: "3",
    label: labels.holidays.generalInformationForm.fields.contract.label,
    value: "contrato de trabajo a término indefinido",
  },
];
