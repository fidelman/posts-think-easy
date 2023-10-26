import { formatDate } from "@/utils/formatPosts";
import {
  PostDetailRepository,
  postDetailRepository,
} from "./PostDetailRepository";

class PostDetailPresenter {
  constructor(private readonly repository: PostDetailRepository) {}

  async getPostDetail(postId: string) {
    const response = await this.repository.fetchPostDetail(postId);
    return PostDetailPresenter.format(response);
  }

  static format(postDto: any) {
    return {
      authorId: postDto.authorId,
      updatedAt: formatDate(postDto.updatedAt),
      content: postDto.content,
      title: postDto.title,
    };
  }
}

export const postDetailPresenter = new PostDetailPresenter(
  postDetailRepository
);
