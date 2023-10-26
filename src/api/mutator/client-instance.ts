import { AuthRepository } from "@/auth/AuthRepository";
import Axios, {
  AxiosError,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from "axios";
import { BASE_URL, instanceCreator } from "./instance-creator";
import { clientAuthRepository } from "@/auth/clientAuthInstance";

const getAxiosInstance = () => {
  const config: CreateAxiosDefaults = {
    baseURL: BASE_URL,
  };
  const accessToken = clientAuthRepository.accessToken;
  if (accessToken) {
    config.headers = { Authorization: `Bearer ${accessToken}` };
  }

  return Axios.create(config);
};

export const clientInstance = <T>(config: AxiosRequestConfig) => {
  const instance = instanceCreator(getAxiosInstance());
  return instance<T>(config);
};
