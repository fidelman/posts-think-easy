import { useCallback } from "react";
import { BodyType } from "@/api/mutator/instance-creator";
import { AbstractSigningPresenter } from "../AbstractSigningPresenter";
import { SignupInput } from "@/api/clientInstanceEndpoints.schemas";
import { clientAuthRepository } from "../clientAuthInstance";

class SignUpPresenter extends AbstractSigningPresenter<SignupInput> {
  async execute(input: BodyType<SignupInput>) {
    const response = await this.repository.signup(input);
    if (response.error) {
      const { message } = response.error;
      return typeof message === "string" ? [message] : message;
    }
    return null;
  }
}

const signUpPresenter = new SignUpPresenter(clientAuthRepository);

interface Params {
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
}

export const useSignUpPresenter = ({ onError, onSuccess }: Params) => {
  const signUp = useCallback(
    async (input: BodyType<SignupInput>) => {
      const errorMessages = await signUpPresenter.execute(input);
      if (errorMessages && onError) {
        signUpPresenter.notifyErrorMessages(errorMessages, onError);
        return;
      }
      onSuccess?.();
    },
    [onError, onSuccess]
  );

  return { signUp };
};
