import { formatPost } from "@/utils/formatPosts";
import {
  PostsByUserRepository,
  postsByUserRepository,
} from "./PostsByUserRepository";
import { PostResponse } from "@/api/serverInstanceEndpoints.schemas";
import { ResponseDTO } from "@/api/mutator/instance-creator";

interface Callbacks {
  onSessionExpired?: () => void;
  onError?: (message: string) => void;
}

class PostsByUserPresenter {
  constructor(private readonly repository: PostsByUserRepository) {}

  static handleResponse(response: ResponseDTO<PostResponse[]>) {
    if (response.error) {
      if (response.error.statusCode === 401) {
        return {
          message: "Session Expired",
          status: "session-expired" as const,
          data: null,
        };
      }
      return {
        message:
          typeof response.error.message === "string"
            ? response.error.message
            : response.error.message.join(""),
        status: "error" as const,
        data: null,
      };
    }

    if (!response.data) {
      return {
        status: "error" as const,
        message: "Unknown error",
        data: null,
      };
    }

    return {
      status: "ok" as const,
      message: "",
      data: PostsByUserPresenter.format(response.data),
    };
  }

  async getPostsByUser(userId: string) {
    const response = await this.repository.fetchPostsByUser(userId);

    return PostsByUserPresenter.handleResponse(response);
  }

  static format(postsDto: PostResponse[]) {
    return postsDto.map(formatPost);
  }
}

const postsByUserPresenter = new PostsByUserPresenter(postsByUserRepository);

export const usePostsByUserPresenter = (cb?: Callbacks) => {
  const getPostsByUser = async (userId: string) => {
    const response = await postsByUserPresenter.getPostsByUser(userId);

    if (response.status === "session-expired") {
      cb?.onSessionExpired?.();
    }

    if (response.status !== "ok" || !response.data) {
      cb?.onError?.(response.message);
    }

    return response.data ?? [];
  };

  return { getPostsByUser };
};
