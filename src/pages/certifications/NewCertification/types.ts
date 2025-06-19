import { IGeneralInformationEntry } from "./forms/GeneralInformationForm/types";

export interface IFormsUpdateData<
  T extends IGeneralInformationEntry = IGeneralInformationEntry,
> {
  personalInformation: { isValid: boolean; values: T };
}

export interface ModalState {
  isSendModalVisible: boolean;
  isRequestInfoModalVisible: boolean;
}
