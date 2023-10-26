import { Gateway, serverGatewayCreator } from "@/api/serverGatewayCreator";

export class PostDetailRepository {
  constructor(private readonly gateway: Gateway) {}

  async fetchPostDetail(postId: string) {
    const response = await this.gateway.postsControllerPost(postId);

    if (response.error) {
      throw new Error("Failed to fetch data");
    }

    return response.data;
  }
}

export const postDetailRepository = new PostDetailRepository(
  serverGatewayCreator()
);
