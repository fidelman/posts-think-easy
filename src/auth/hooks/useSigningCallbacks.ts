import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useSigningCallbacks = () => {
  const router = useRouter();
  const handleError = (errorMessage: string) => {
    toast.error(errorMessage, { position: "bottom-left" });
  };

  const handleSuccess = () => {
    router.push("/");
    router.refresh();
  };

  return {
    onError: handleError,
    onSuccess: handleSuccess,
  };
};
