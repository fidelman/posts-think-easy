import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BodyType } from "@/api/mutator/instance-creator";
import { AbstractSigningPresenter } from "../AbstractSigningPresenter";
import { LoginInput } from "@/api/clientInstanceEndpoints.schemas";
import { clientAuthRepository } from "../clientAuthInstance";

class LogInPresenter extends AbstractSigningPresenter<LoginInput> {
  async execute(input: BodyType<LoginInput>) {
    const response = await this.repository.login(input);
    if (response.error) {
      const { message } = response.error;
      return typeof message === "string" ? [message] : message;
    }
    return null;
  }
}

const logInPresenter = new LogInPresenter(clientAuthRepository);

interface Params {
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}

export const useLogInPresenter = (cb?: Params) => {
  const isLoggedIn = logInPresenter.isLoggedIn;

  const logIn = useCallback(
    async (input: BodyType<LoginInput>) => {
      const errorMessages = await logInPresenter.execute(input);
      if (errorMessages && cb?.onError) {
        logInPresenter.notifyErrorMessages(errorMessages, cb.onError);
        return;
      }
      cb?.onSuccess?.();
    },
    [cb]
  );

  return { logIn, isLoggedIn };
};
