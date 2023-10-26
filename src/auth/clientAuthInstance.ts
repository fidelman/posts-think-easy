import { clientCookieProvider } from "@/cookie/ClientCookieProvider";
import { AuthRepository } from "./AuthRepository";
import { clientGatewayCreator } from "@/api/clientGatewayCreator";

export const clientAuthRepository = new AuthRepository(
  clientCookieProvider,
  clientGatewayCreator()
);
