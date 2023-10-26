"use client";
import { useCallback } from "react";
import { useSignOutPresenter } from "../SignOutPresenter";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();
  const handleSuccess = useCallback(() => {
    router.push("/");
    router.refresh();
  }, [router]);

  const { signOut } = useSignOutPresenter({ onSuccess: handleSuccess });

  return (
    <button onClick={signOut} className="btn btn-transparent">
      Sign Out
    </button>
  );
};
