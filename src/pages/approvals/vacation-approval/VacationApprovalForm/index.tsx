import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import { Logger } from "@utils/logger";
import { useSignOut } from "@hooks/useSignOut";
import { useAppContext } from "@context/AppContext";
import { useApprovalHumanResourceRequestAPI } from "@src/hooks/useApprovalHumanResourceRequestAPI";

import { VacationApprovalFormUI } from "./interface";
import { ApprovalOptions, IFormValues } from "./types";

interface VacationApprovalFormProps {
  vacationType?: string;
  requestNumber?: string;
  requestId?: string;
  employeeName?: string;
  employeeSurname?: string;
  observationsRequired?: boolean;
  daysRequested?: number;
  periodFrom?: string;
  periodTo?: string;
  taskManagingId?: string;
}

function VacationApprovalForm(props: VacationApprovalFormProps) {
  const {
    vacationType,
    requestNumber,
    requestId,
    employeeName,
    employeeSurname,
    observationsRequired = true,
    daysRequested,
    periodFrom,
    periodTo,
    taskManagingId,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const { submitApproval, isLoading } = useApprovalHumanResourceRequestAPI();
  const { staffUser } = useAppContext();
  const { signOut } = useSignOut();

  const validationSchema = Yup.object({
    approval: Yup.string().required(
      "Debe seleccionar una opción de aprobación",
    ),
    observation: Yup.string()
      .max(500, "Las observaciones no pueden exceder 500 caracteres")
      .when("approval", {
        is: ApprovalOptions.REJECT,
        then: (schema) =>
          observationsRequired
            ? schema.required(
                "Las observaciones son obligatorias al rechazar la solicitud",
              )
            : schema,
        otherwise: (schema) => schema,
      }),
  });

  const formik: FormikProps<IFormValues> = useFormik<IFormValues>({
    initialValues: {
      approval: "",
      observation: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Submitting form with values:", values);
      try {
        await submitApproval({
          humanResourceRequestId: requestId ?? "",
          taskManagingId: taskManagingId ?? "",
          actionExecuted: values.approval,
          description: values.observation
            ? values.observation
            : "Aprobación de solicitud de vacaciones por jefe inmediato",
          userWhoExecutedAction: staffUser.staffId,
        });

        const approved = values.approval === ApprovalOptions.APPROVE;
        setIsApproved(approved);
        setShowModal(true);
      } catch (error) {
        Logger.error(
          "Error al procesar la solicitud de aprobación de vacaciones",
          error instanceof Error ? error : new Error(String(error)),
        );
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    signOut();
  };

  return (
    <VacationApprovalFormUI
      formik={formik}
      vacationType={vacationType}
      requestNumber={requestNumber}
      observationsRequired={observationsRequired}
      showModal={showModal}
      isApproved={isApproved}
      employeeName={employeeName}
      employeeSurname={employeeSurname}
      daysRequested={daysRequested}
      periodFrom={periodFrom}
      periodTo={periodTo}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCloseModal={handleCloseModal}
    />
  );
}

export { VacationApprovalForm };
