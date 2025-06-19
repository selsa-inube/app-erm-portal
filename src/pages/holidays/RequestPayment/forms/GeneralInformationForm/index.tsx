import { useEffect, forwardRef, useImperativeHandle } from "react";
import { useFormik, FormikProps } from "formik";
import { object, string } from "yup";

import { validationMessages } from "@validations/validationMessages";
import { validationRules } from "@validations/validationRules";

import { generalInformationRequiredFields } from "./config/formConfig";
import { GeneralInformationFormUI } from "./interface";
import { IVacationPaymentData } from "@ptypes/humanResourcesRequest.types";

const createValidationSchema = () =>
  object().shape({
    daysToPay: generalInformationRequiredFields.daysToPay
      ? validationRules.daysOff.required(validationMessages.required)
      : validationRules.daysOff,
    contract: generalInformationRequiredFields.contract
      ? string().required(validationMessages.required)
      : string(),
    observations: generalInformationRequiredFields.observations
      ? validationRules.observations.required(validationMessages.required)
      : validationRules.observations,
  });

const validationSchema = createValidationSchema();

interface GeneralInformationFormProps {
  initialValues: IVacationPaymentData;
  loading?: boolean;
  withNextButton?: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (values: IVacationPaymentData) => void;
}

const GeneralInformationForm = forwardRef<
  FormikProps<IVacationPaymentData>,
  GeneralInformationFormProps
>(
  (
    {
      initialValues,
      onFormValid,
      onSubmit,
      handleNextStep,
      handlePreviousStep,
      loading,
      withNextButton = false,
    },
    ref,
  ) => {
    const formik = useFormik({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      onSubmit: onSubmit ?? (() => true),
    });

    useImperativeHandle(ref, () => formik);

    useEffect(() => {
      if (onFormValid) {
        formik.validateForm().then((errors) => {
          const isFormValid = Object.keys(errors).length === 0;
          onFormValid(isFormValid);
        });
      }
    }, [formik.values, onFormValid]);

    return (
      <GeneralInformationFormUI
        loading={loading}
        formik={formik}
        withNextButton={withNextButton}
        validationSchema={validationSchema}
        handlePreviousStep={handlePreviousStep}
        handleNextStep={handleNextStep}
      />
    );
  },
);

GeneralInformationForm.displayName = "GeneralInformationForm";

export { GeneralInformationForm };
export type { GeneralInformationFormProps };
