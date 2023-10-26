import { serverCookieProvider } from "@/cookie/ServerCookieProvider";
import { AuthRepository } from "./AuthRepository";
import { serverGatewayCreator } from "@/api/serverGatewayCreator";

export const serverAuthRepository = new AuthRepository(
  serverCookieProvider,
  serverGatewayCreator()
);
