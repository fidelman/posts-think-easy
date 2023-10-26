import { PostListItem } from "@/posts/components/PostListItem";

interface PostsListProps {
  posts: any[];
}

export const PostsList = (props: PostsListProps) => (
  <ul>
    {props.posts.map((post) => (
      <li key={post.id}>
        <PostListItem
          post={{
            id: post.id,
            title: post.title,
            content: post.content,
            updatedAt: post.updatedAt,
          }}
        />
      </li>
    ))}
  </ul>
);
