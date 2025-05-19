import { IOption } from "@inubekit/inubekit";

const mockStaffMembers: IOption[] = [
  {
    id: "1",
    label: "Juan Pérez",
    value: "1",
  },
  {
    id: "2",
    label: "María González",
    value: "2",
  },
  {
    id: "3",
    label: "Carlos Rodríguez",
    value: "3",
  },
  {
    id: "4",
    label: "Ana Martínez",
    value: "4",
  },
  {
    id: "5",
    label: "Luis Sánchez",
    value: "5",
  },
];

const businessUnitStaff = [
  {
    businessUnitPublicCode: "860514047",
    languageId: "1111",
    abbreviatedName: "SistemasEnLinea",
    descriptionUse: "SistemasEnLinea",
    firstMonthOfFiscalYear: "JAN",
    urlLogo: "http://www.sistemasenlinea.com.co/images/logos/selsalogo2.png",
  },
  {
    businessUnitPublicCode: "cooptraisspru",
    languageId: "1111",
    abbreviatedName: "cooptraisspru",
    descriptionUse: "cooptraisspru",
    firstMonthOfFiscalYear: "JAN",
    urlLogo: "http://www.sistemasenlinea.com.co/images/nuevo-logo-linix.png",
  },
  {
    businessUnitPublicCode: "test",
    languageId: "1111",
    abbreviatedName: "test",
    descriptionUse: "test ",
    firstMonthOfFiscalYear: "JAN",
    urlLogo: "http://logo.png",
  },
  {
    businessUnitPublicCode: "test2",
    languageId: "1111",
    abbreviatedName: "test2",
    descriptionUse: "test2",
    firstMonthOfFiscalYear: "JAN",
    urlLogo: "http://logo.png",
  },
];

export { mockStaffMembers, businessUnitStaff };
