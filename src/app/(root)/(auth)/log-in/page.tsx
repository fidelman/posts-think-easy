"use client";
import { useLogInPresenter } from "@/auth/login/LogInPresenter";
import { FormGenerator } from "../../../../auth/components/FormGenerator";
import { useSigningCallbacks } from "@/auth/hooks/useSigningCallbacks";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useEffect } from "react";
import { useSignOutPresenter } from "@/auth/signout/SignOutPresenter";
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
];

type Values = Record<(typeof fields)[number]["id"], string>;

export default function LogIn() {
  const router = useRouter();
  const { onError, onSuccess } = useSigningCallbacks();
  const { logIn } = useLogInPresenter({
    onError,
    onSuccess,
  });
  const { signOut } = useSignOutPresenter({
    onSuccess: () => router.refresh(),
  });
  const handleSubmit = async (values: Values) => {
    await logIn({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    signOut();
  }, []);

  return (
    <ErrorBoundary>
      <FormGenerator
        onSubmit={handleSubmit}
        buttonLabel="Log In"
        fields={fields}
      />
    </ErrorBoundary>
  );
}
