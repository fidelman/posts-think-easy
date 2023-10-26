export { getThinkEasy as clientGatewayCreator } from "./clientInstanceEndpoints";
import { getThinkEasy } from "./clientInstanceEndpoints";

export type Gateway = ReturnType<typeof getThinkEasy>;
