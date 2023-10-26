import { Perex } from "@/posts/components/PostListItem";

interface PostDetailProps {
  post: {
    authorId: string;
    updatedAt: string;
    content: string;
    title: string;
  };
}

export const PostDetail = (props: PostDetailProps) => (
  <div className="gap-5 flex flex-col">
    <Perex authorId={props.post.authorId} updatedAt={props.post.updatedAt} />
    <h1 className="text-5xl font-semibold">{props.post.title}</h1>
    <p className="text-lg font-serif">{props.post.content}</p>
  </div>
);
