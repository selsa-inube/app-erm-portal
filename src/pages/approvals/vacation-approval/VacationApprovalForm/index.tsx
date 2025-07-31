import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import { VacationApprovalFormUI } from "./interface";

interface FormValues {
  approval: string;
  observation: string;
}

interface ApprovalOption {
  id: string;
  value: string;
  label: string;
}

const validationSchema = Yup.object({
  approval: Yup.string().required("Debe seleccionar una opción de aprobación"),
  observation: Yup.string()
    .required("Las observaciones son obligatorias")
    .max(500, "Las observaciones no pueden exceder 500 caracteres"),
});

const approvalOptions: ApprovalOption[] = [
  { id: "approve", value: "approve", label: "Aprobar vacaciones" },
  { id: "reject", value: "reject", label: "No aprobar vacaciones" },
];

function VacationApprovalForm(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      approval: "",
      observation: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Formulario enviado:", values);

      const approved = values.approval === "approve";
      setIsApproved(approved);

      setShowModal(true);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
  };

  return (
    <VacationApprovalFormUI
      formik={formik}
      approvalOptions={approvalOptions}
      showModal={showModal}
      isApproved={isApproved}
      onSubmit={handleSubmit}
      onCloseModal={handleCloseModal}
    />
  );
}

export { VacationApprovalForm };
