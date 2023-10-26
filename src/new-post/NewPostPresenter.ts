import { CreatePostInput } from "@/api/clientInstanceEndpoints.schemas";
import { newPostRepository } from "./NewPostRepository";
import { useCallback } from "react";
import { BodyType } from "@/api/mutator/instance-creator";

type Status = "published" | "session-expired" | "error";

interface Response {
  message: string;
  status: Status;
}

export const useNewPostPresenter = () => {
  const publish = useCallback(
    async (input: BodyType<CreatePostInput>): Promise<Response> => {
      const response = await newPostRepository.publish(input);
      if (response.error) {
        if (response.error.statusCode === 401) {
          return {
            message: "Session Expired",
            status: "session-expired",
          };
        }
        return {
          message:
            typeof response.error.message === "string"
              ? response.error.message
              : response.error.message.join(""),
          status: "error",
        };
      }

      return {
        message: "Post published",
        status: "published",
      };
    },
    []
  );

  return { publish };
};
