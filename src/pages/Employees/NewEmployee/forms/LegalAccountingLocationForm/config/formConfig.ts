import { IOption } from "@inubekit/inubekit";

const LegalAccountingLocationRequiredFields = {
  proyect: true,
  zonalSegmentation: true,
  costCenter: true,
};

const proyectOptions: IOption[] = [
  { id: "1", label: "Proyecto Alpha", value: "alpha" },
  { id: "2", label: "Proyecto Beta", value: "beta" },
  { id: "3", label: "Proyecto Gamma", value: "gamma" },
];

const zonalSegmentationOptions: IOption[] = [
  { id: "1", label: "Zona Norte", value: "north" },
  { id: "2", label: "Zona Sur", value: "south" },
  { id: "3", label: "Zona Centro", value: "center" },
];

const costCenterOptions: IOption[] = [
  { id: "1", label: "Administración - CC001", value: "cc001" },
  { id: "2", label: "Operaciones - CC002", value: "cc002" },
  { id: "3", label: "Ventas - CC003", value: "cc003" },
];

export {
  LegalAccountingLocationRequiredFields,
  proyectOptions,
  zonalSegmentationOptions,
  costCenterOptions,
};
