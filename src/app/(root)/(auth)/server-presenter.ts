import { serverAuthRepository } from "@/auth/serverAuthInstance";

export const useServerAuth = () => {
  const isLoggedIn = serverAuthRepository.isLoggedIn;

  return { isLoggedIn };
};
