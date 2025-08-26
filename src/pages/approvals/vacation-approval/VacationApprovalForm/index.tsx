import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import { VacationApprovalFormUI } from "./interface";

interface FormValues {
  approval: string;
  observation: string;
}

interface VacationApprovalFormProps {
  vacationType?: string;
  requestId?: string;
  employeeName?: string;
  employeeSurname?: string;
  observationsRequired?: boolean;
  daysRequested?: number;
  periodFrom?: string;
  periodTo?: string;
}

function VacationApprovalForm(props: VacationApprovalFormProps) {
  const {
    vacationType,
    requestId,
    employeeName,
    employeeSurname,
    observationsRequired = true,
    daysRequested,
    periodFrom,
    periodTo,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const validationSchema = Yup.object({
    approval: Yup.string().required(
      "Debe seleccionar una opción de aprobación",
    ),
    observation: Yup.string()
      .max(500, "Las observaciones no pueden exceder 500 caracteres")
      .when("approval", {
        is: "reject",
        then: (schema) =>
          observationsRequired
            ? schema.required(
                "Las observaciones son obligatorias al rechazar la solicitud",
              )
            : schema,
        otherwise: (schema) => schema,
      }),
  });

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
      vacationType={vacationType}
      requestId={requestId}
      observationsRequired={observationsRequired}
      showModal={showModal}
      isApproved={isApproved}
      employeeName={employeeName}
      employeeSurname={employeeSurname}
      daysRequested={daysRequested}
      periodFrom={periodFrom}
      periodTo={periodTo}
      onSubmit={handleSubmit}
      onCloseModal={handleCloseModal}
    />
  );
}

export { VacationApprovalForm };
