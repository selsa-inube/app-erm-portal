import { employee } from "./employee";
import { contracts } from "./contracts";
import { home } from "./home";
import { requests } from "./requests";
import { holidays } from "./holidays";
import { certifications } from "./certifications";
import { modal } from "./modal";
import { widgets } from "./widgets";
import { layout } from "./layout";
import { data } from "./data";
import { validations } from "./validations";
import { types } from "./types";
import { config } from "./config";
import { login } from "./login";

export const labels = {
  employee,
  contracts,
  home,
  requests,
  holidays,
  certifications,
  modal,
  widgets,
  layout,
  data,
  validations,
  types,
  config,
  login,
};

export type Labels = typeof labels;
