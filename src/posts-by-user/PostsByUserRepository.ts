import { Gateway, serverGatewayCreator } from "@/api/serverGatewayCreator";
import { AuthRepository } from "@/auth/AuthRepository";
import { serverAuthRepository } from "@/auth/serverAuthInstance";

export class PostsByUserRepository {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly gateway: Gateway
  ) {}

  async fetchPostsByUser(userId: string) {
    const response = await this.gateway.postsControllerUserPosts(userId);
    if (response.error) {
      if (response.error.statusCode === 401) {
        const updateTokenResponse = await this.authRepository.updateToken();
        if (updateTokenResponse.error) {
          return {
            data: null,
            error: updateTokenResponse.error,
          };
        } else {
          return this.gateway.postsControllerUserPosts(userId);
        }
      }
    }
    return response;
  }
}

export const postsByUserRepository = new PostsByUserRepository(
  serverAuthRepository,
  serverGatewayCreator()
);
