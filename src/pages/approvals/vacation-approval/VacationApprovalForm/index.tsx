import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";

import { VacationApprovalFormUI } from "./interface";
import { VacationType } from "./types";

interface FormValues {
  approval: string;
  observation: string;
}

interface VacationApprovalFormProps {
  vacationType: VacationType;
  requestId: string;
  observationsRequired?: boolean;
}

function VacationApprovalForm({
  vacationType,
  requestId,
  observationsRequired = true,
}: VacationApprovalFormProps): JSX.Element {
  const validationSchema = Yup.object({
    approval: Yup.string().required(
      "Debe seleccionar una opción de aprobación",
    ),
    observation: observationsRequired
      ? Yup.string()
          .required("Las observaciones son obligatorias")
          .max(500, "Las observaciones no pueden exceder 500 caracteres")
      : Yup.string().max(
          500,
          "Las observaciones no pueden exceder 500 caracteres",
        ),
  });

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
      vacationType={vacationType}
      requestId={requestId}
      observationsRequired={observationsRequired}
      onSubmit={handleSubmit}
    />
  );
}

export { VacationApprovalForm };
