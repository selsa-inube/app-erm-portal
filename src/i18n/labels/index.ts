import { employee } from "./employee";
import { contracts } from "./contracts";
import { home } from "./home";
import { requests } from "./requests";
import { holidays } from "./holidays";
import { certifications } from "./certifications";

export const labels = {
  employee,
  contracts,
  home,
  requests,
  holidays,
  certifications,
};

export type Labels = typeof labels;
