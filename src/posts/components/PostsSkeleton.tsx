import { PostListItemSkeleton } from "./PostListItem";

const amount = 4;

export const PostsSkeleton = () => (
  <div className="gap-4 flex flex-col">
    <ul>
      {new Array(amount).fill(0).map((_, i) => (
        <li key={i}>
          <PostListItemSkeleton />
        </li>
      ))}
    </ul>
  </div>
);
