import { ChangeEvent, MouseEventHandler } from "react";
import { Input } from "./Input";
import { FormikErrors } from "formik";

export interface FieldConfig {
  id: string;
  label: string;
  type: "email" | "password" | "text";
}

export type Values = Record<string, string>;

interface FormProps {
  handleFormSubmit: () => void;
  fields: FieldConfig[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FormikErrors<Values>;
  isSubmitting: boolean;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  buttonLabel: string;
}

export const Form = (props: FormProps) => (
  <form
    onSubmit={props.handleFormSubmit}
    className="flex flex-col gap-5 w-80 mx-auto"
  >
    {props.fields.map((field) => (
      <Input
        key={field.id}
        id={field.id}
        type={field.type}
        label={field.label}
        onChange={props.handleChange}
        error={props.errors[field.id]}
      />
    ))}
    <button
      disabled={props.isSubmitting}
      type="submit"
      className="mx-auto btn btn-primary"
      onClick={props.handleSubmit}
    >
      {props.buttonLabel}
    </button>
  </form>
);
