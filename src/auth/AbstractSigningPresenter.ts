import { BodyType } from "@/api/mutator/instance-creator";
import { AuthRepository } from "./AuthRepository";

export abstract class AbstractSigningPresenter<TInput> {
  repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  abstract execute(input: BodyType<TInput>): Promise<string[] | null>;

  notifyErrorMessages(
    errorMessages: string[],
    notify: (message: string) => void
  ) {
    errorMessages.forEach((errorMessage) => {
      notify(errorMessage);
    });
  }

  get isLoggedIn() {
    return this.repository.isLoggedIn;
  }
}
