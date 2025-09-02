import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import { usePatchHumanResourceRequest } from "@hooks/usePatchHumanResourceRequest";
import { useAppContext } from "@context/AppContext";

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
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const { updateRequest, reset, isLoading } = usePatchHumanResourceRequest();

  const { staffUser } = useAppContext();

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
      try {
        const currentDate = new Date().toISOString();

        const requestBody = {
          humanResourceRequestId: requestId,
          modifyJustification: values.observation || "Sin observaciones",
          humanResourceRequestDate: currentDate,
          humanResourceRequestTraceabilities: [
            {
              actionExecuted: values.approval,
              description: values.observation || "Sin observaciones",
              executionDate: currentDate,
              transactionOperation: "Insert",
              userWhoExecutedAction: staffUser.staffId,
            },
          ],
        };

        await updateRequest(requestBody);

        const approved = values.approval === ApprovalOptions.APPROVE;
        setIsApproved(approved);
        setShowModal(true);
      } catch (error) {
        console.error("Error al procesar la solicitud:", error);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    reset();
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
