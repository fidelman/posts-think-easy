import { AuthRepository, clientAuthRepository } from "@/auth/AuthRepository";
import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
} from "axios";
import { cookies } from "next/headers";
import { BASE_URL, instanceCreator } from "./instance-creator";

const getAxiosInstance = () => {
  const config: CreateAxiosDefaults = {
    baseURL: BASE_URL,
  };

  const accessToken = cookies().get("accessToken")?.value;
  if (accessToken) {
    config.headers = { Authorization: `Bearer ${accessToken}` };
  }

  return Axios.create(config);
};

export const serverInstance = <T>(config: AxiosRequestConfig) => {
  const instance = instanceCreator(getAxiosInstance());
  return instance<T>(config);
};
