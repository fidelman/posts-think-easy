import { PostResponse } from "@/api/serverInstanceEndpoints.schemas";
import format from "date-fns/format";

export const formatDate = (rawDate: string) =>
  format(new Date(rawDate), "d MMM");

export const formatPost = (post: PostResponse) => ({
  id: post.id,
  title: post.title,
  content: post.content,
  updatedAt: formatDate(post.updatedAt),
  authorId: post.authorId,
});
