import { CreatePostInput } from "@/api/clientInstanceEndpoints.schemas";
import { BodyType } from "@/api/mutator/instance-creator";
import { getThinkEasy } from "@/api/clientInstanceEndpoints";
import { AuthRepository } from "@/auth/AuthRepository";
import { clientAuthRepository } from "@/auth/clientAuthInstance";
import { Gateway, clientGatewayCreator } from "@/api/clientGatewayCreator";

class NewPostRepository {
  constructor(
    private authRepository: AuthRepository,
    private readonly gateway: Gateway
  ) {}

  private refreshToken() {
    return this.authRepository.updateToken();
  }

  private createPost(input: BodyType<CreatePostInput>) {
    return this.gateway.postsControllerCreate(input);
  }

  async publish(input: BodyType<CreatePostInput>) {
    const createPostResponse = await this.createPost(input);
    if (createPostResponse.error) {
      if (createPostResponse.error.statusCode === 401) {
        const updateTokenResponse = await this.refreshToken();
        if (updateTokenResponse.error) {
          this.authRepository.signOut();
          return updateTokenResponse;
        } else {
          const repeatCreatePostResponse = await this.createPost(input);
          return repeatCreatePostResponse;
        }
      }
    }
    return createPostResponse;
  }
}

export const newPostRepository = new NewPostRepository(
  clientAuthRepository,
  clientGatewayCreator()
);
