import { IAssistedStep } from "@inubekit/inubekit";
import { labels } from "@i18n/labels";

export const newEmployeeSteps: IAssistedStep[] = [
  {
    id: 1,
    number: 1,
    name: labels.employee.newEmployee.steps.personalData.name,
    description: labels.employee.newEmployee.steps.personalData.description,
  },
  {
    id: 2,
    number: 2,
    name: labels.employee.newEmployee.steps.contractualPosition.name,
    description:
      labels.employee.newEmployee.steps.contractualPosition.description,
  },
  {
    id: 3,
    number: 3,
    name: labels.employee.newEmployee.steps.legalAccountingLocation.name,
    description:
      labels.employee.newEmployee.steps.legalAccountingLocation.description,
  },
  {
    id: 4,
    number: 4,
    name: labels.employee.newEmployee.steps.assignments.name,
    description: labels.employee.newEmployee.steps.assignments.description,
  },
  {
    id: 5,
    number: 5,
    name: labels.employee.newEmployee.steps.unmetRequirements.name,
    description:
      labels.employee.newEmployee.steps.unmetRequirements.description,
  },
  {
    id: 6,
    number: 6,
    name: labels.employee.newEmployee.steps.verification.name,
    description: labels.employee.newEmployee.steps.verification.description,
  },
];
