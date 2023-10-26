import clsx from "clsx";
import Link from "next/link";

export interface Post {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  authorId?: string;
}

export interface PostListItemProps {
  post: Post;
  isAuthorAvailable?: boolean;
}

export const PostListItem = ({
  post,
  isAuthorAvailable,
}: PostListItemProps) => {
  return (
    <div className="border-b py-3">
      <Perex
        authorId={post.authorId}
        isAuthorAvailable={isAuthorAvailable}
        updatedAt={post.updatedAt}
      />
      <h3 className="post-list-item-title">
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p className="post-list-item-content">{post.content}</p>
    </div>
  );
};

export const PostListItemSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col border-b py-3 gap-3">
      <div className="flex gap-2">
        <div className="bg-gray-200 rounded h-5 w-48"></div>
        <div className=" bg-gray-200 rounded h-5 w-12"></div>
      </div>
      <div className="h-5 bg-gray-200 rounded w-72" />
      <div className="h-16 bg-gray-200 rounded w-full" />
    </div>
  );
};

const AuthorLink = ({
  authorId,
  isAvailable,
}: {
  authorId: string;
  isAvailable?: boolean;
}) => {
  return (
    <Link
      className={clsx(
        "text-sm font-light text-gray-600 hover:text-gray-800 underline",
        {
          "hover:cursor-not-allowed": !isAvailable,
        }
      )}
      href={`/posts/user/${authorId}`}
      title={isAvailable ? "View author's profile" : "Authorization required"}
    >
      {authorId}
    </Link>
  );
};

export const Perex = ({
  authorId,
  updatedAt,
  isAuthorAvailable,
}: {
  authorId?: string;
  updatedAt: string;
  isAuthorAvailable?: boolean;
}) => {
  return (
    <p className="flex gap-1">
      {authorId && (
        <AuthorLink isAvailable={isAuthorAvailable} authorId={authorId} />
      )}
      {authorId ? <span className="text-sm text-gray-500">·</span> : ""}
      <span className="text-sm text-gray-500 font-light">{updatedAt}</span>
    </p>
  );
};
