"use client";
import { FormGenerator } from "../../../../auth/components/FormGenerator";
import { useSignUpPresenter } from "@/auth/signup/SignUpPresenter";
import { useSigningCallbacks } from "@/auth/hooks/useSigningCallbacks";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useSignOutPresenter } from "@/auth/signout/SignOutPresenter";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const fields = [
  {
    id: "email",
    type: "email" as const,
    label: "Email",
  },
  {
    id: "password",
    type: "password" as const,
    label: "Password",
  },
  {
    id: "firstname",
    type: "text" as const,
    label: "First name",
  },
  {
    id: "lastname",
    type: "text" as const,
    label: "Last name",
  },
];

type Values = Record<(typeof fields)[number]["id"], string>;

export default function SignUp() {
  const router = useRouter();
  // const { signOut } = useSignOutPresenter({
  //   onSuccess: () => router.refresh(),
  // });
  // useEffect(() => {
  //   signOut();
  // }, []);
  const { onError, onSuccess } = useSigningCallbacks();
  const { signUp } = useSignUpPresenter({
    onError,
    onSuccess,
  });
  const handleSubmit = async (values: Values) => {
    await signUp({
      email: values.email,
      password: values.password,
      firstname: values.firstname,
      lastname: values.lastname,
    });
  };
  return (
    <ErrorBoundary>
      <FormGenerator
        onSubmit={handleSubmit}
        buttonLabel="Sign Up"
        fields={fields}
      />
    </ErrorBoundary>
  );
}
