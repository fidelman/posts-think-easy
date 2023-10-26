import { useRouter } from "next/navigation";
import { AuthRepository } from "../AuthRepository";
import { useCallback } from "react";
import { clientAuthRepository } from "../clientAuthInstance";

class SignOutPresenter {
  constructor(private readonly repository: AuthRepository) {}

  signOut() {
    return this.repository.signOut();
  }
}

const signOutPresenter = new SignOutPresenter(clientAuthRepository);

interface Callbacks {
  onSuccess?: () => void;
}

export const useSignOutPresenter = (cb?: Callbacks) => {
  const signOut = useCallback(async () => {
    await signOutPresenter.signOut();
    cb?.onSuccess?.();
  }, [cb]);

  return { signOut };
};
