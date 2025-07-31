import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";

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
  const formik: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      approval: "",
      observation: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Formulario enviado:", values);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <VacationApprovalFormUI
      formik={formik}
      approvalOptions={approvalOptions}
      onSubmit={handleSubmit}
    />
  );
}

export { VacationApprovalForm };
