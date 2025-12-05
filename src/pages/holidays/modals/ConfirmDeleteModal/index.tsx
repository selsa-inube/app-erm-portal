import {
  TextAreaModal,
  TextAreaModalProps,
} from "@components/modals/TextAreaModal";
import { labels } from "@i18n/labels";

interface ConfirmDeleteModalProps
  extends Omit<
    TextAreaModalProps,
    "title" | "buttonText" | "inputLabel" | "inputPlaceholder" | "maxLength"
  > {
  onConfirmDelete: (justification: string) => void;
}

export function ConfirmDeleteModal(props: ConfirmDeleteModalProps) {
  const { onConfirmDelete, onCloseModal, ...rest } = props;

  return (
    <TextAreaModal
      {...rest}
      title={labels.holidays.modals.confirmDelete.title}
      buttonText={labels.holidays.modals.confirmDelete.buttonText}
      inputLabel={labels.holidays.modals.confirmDelete.inputLabel}
      inputPlaceholder={labels.holidays.modals.confirmDelete.inputPlaceholder}
      maxLength={120}
      secondaryButtonText={
        labels.holidays.modals.confirmDelete.secondaryButtonText
      }
      onSubmit={(values) => {
        onConfirmDelete(values.textarea);
      }}
      onCloseModal={onCloseModal}
    />
  );
}
