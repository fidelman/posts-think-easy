import { PostDetail } from "@/post-detail/components/PostDetail";
import { postDetailPresenter } from "@/post-detail/PostDetailPresenter";

interface PageProps {
  params: {
    postId: string;
  };
}

async function Page(props: PageProps) {
  const data = await postDetailPresenter.getPostDetail(props.params.postId);

  return <PostDetail post={data} />;
}

export default Page;
