import { Formik, FormikHelpers } from "formik";
import { useCallback, useMemo, useState } from "react";
import { FieldConfig, Form, Values } from "./Form";

interface FormProps {
  fields: FieldConfig[];
  onSubmit: (values: Values) => void;
  buttonLabel: string;
}

export const FormGenerator = ({ fields, onSubmit, buttonLabel }: FormProps) => {
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const initialValues = useMemo(
    () =>
      fields.reduce<Values>((acc, field) => {
        field.id;
        acc[field.id] = "";
        return acc;
      }, {}),
    [fields]
  );

  const handleFormSubmit = useCallback(
    (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
      setSubmitting(false);
      onSubmit(values);
    },
    [onSubmit]
  );

  const handleButtonClick = useCallback(
    () => setWasSubmitted(true),
    [setWasSubmitted]
  );

  const handleValidate = useCallback(
    (values: Values) =>
      fields.reduce<Values>((acc, field) => {
        if (!values[field.id]) {
          acc[field.id] = "required";
        }
        if (
          field.type === "email" &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          acc[field.id] = "not a valid email";
        }

        if (field.type === "password" && values.password.length < 8) {
          acc[field.id] = "password is shorter than 8 characters";
        }

        return acc;
      }, {}),
    [fields]
  );

  return (
    <Formik
      validateOnChange={wasSubmitted}
      validateOnBlur={wasSubmitted}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validate={handleValidate}
    >
      {(params) => (
        <Form
          fields={fields}
          handleChange={params.handleChange}
          errors={params.errors}
          handleSubmit={handleButtonClick}
          isSubmitting={params.isSubmitting}
          handleFormSubmit={params.handleSubmit}
          buttonLabel={buttonLabel}
        />
      )}
    </Formik>
  );
};
