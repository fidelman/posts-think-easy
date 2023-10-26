import { Gateway, clientGatewayCreator } from "@/api/clientGatewayCreator";
import { PostResponse } from "@/api/clientInstanceEndpoints.schemas";
import { useCallback, useState } from "react";
import { atom, useRecoilState } from "recoil";

class PostsRepository {
  constructor(private readonly gateway: Gateway) {}

  async getAllPosts() {
    const dto = await this.gateway.postsControllerGetAllPosts();
    return dto;
  }
}

export const postsState = atom<PostResponse[]>({
  key: "posts",
  default: [],
});

const postsRepository = new PostsRepository(clientGatewayCreator());

export const usePostsRepository = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const [posts, setPosts] = useRecoilState(postsState);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    const posts = await postsRepository.getAllPosts();
    if (posts.data) {
      setPosts(posts.data);
    }
    setIsLoading(false);
    setFetchCompleted(true);
  }, [setPosts, setIsLoading, setFetchCompleted]);

  return { posts, isLoading, fetchCompleted, loadPosts };
};
