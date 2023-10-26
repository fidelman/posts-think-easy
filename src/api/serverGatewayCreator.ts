export { getThinkEasy as serverGatewayCreator } from "./serverInstanceEndpoints";
import { getThinkEasy } from "./serverInstanceEndpoints";

export type Gateway = ReturnType<typeof getThinkEasy>;
