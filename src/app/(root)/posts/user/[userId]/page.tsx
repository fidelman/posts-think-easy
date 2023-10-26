import { usePostsByUserPresenter } from "@/posts-by-user/PostsByUserPresenter";
import { Heading } from "@/posts-by-user/components/Heading";
import { PostsList } from "@/posts-by-user/components/PostsList";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    userId: string;
  };
}
async function Page(props: PageProps) {
  const handleSessionExpired = () => redirect("/log-in");
  const handleError = (errorMessage: string) => {
    throw new Error(errorMessage);
  };

  const { getPostsByUser } = usePostsByUserPresenter({
    onSessionExpired: handleSessionExpired,
    onError: handleError,
  });

  const posts = await getPostsByUser(props.params.userId);
  return (
    <div className="gap-4 flex flex-col">
      <Heading userName={props.params.userId} />
      <PostsList posts={posts} />
    </div>
  );
}

export default Page;
