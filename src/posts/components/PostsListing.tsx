import { Post, PostListItem } from "./PostListItem";

interface PostsListingProps {
  posts: Post[];
  isAuthorsAvailable: boolean;
}

export const PostsListing = (props: PostsListingProps) => (
  <ul>
    {props.posts.map((post) => (
      <li key={post.id}>
        <PostListItem
          isAuthorAvailable={props.isAuthorsAvailable}
          post={post}
        />
      </li>
    ))}
  </ul>
);
