import { NewPostForm } from "../../new-post/components/NewPostForm";
import { withAuth } from "@/utils/withAuth";

function NewPost() {
  return <NewPostForm />;
}

export default withAuth(NewPost);
