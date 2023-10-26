import { usePostsRepository } from "./PostsRepository";
import { formatPost } from "@/utils/formatPosts";

export const usePostsPresenter = (searchQuery: string | null) => {
  const { posts, isLoading, fetchCompleted, loadPosts } = usePostsRepository();

  const filteredPosts = searchQuery
    ? posts.filter(
        (post) =>
          post.published &&
          (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [...posts];

  const formattedPosts = filteredPosts
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .map(formatPost);

  return { posts: formattedPosts, isLoading, fetchCompleted, loadPosts };
};
