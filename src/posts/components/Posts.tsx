"use client";
import { usePostsPresenter } from "../PostsPresenter";
import { RecoilRoot } from "recoil";
import { SearchHeading } from "@/components/SearchHeading";
import { PostsSkeleton } from "./PostsSkeleton";
import { useSearchQueryRepository } from "@/search/SearchQueryRepository";
import { useEffect } from "react";
import { PostsNotFound } from "./PostsNotFound";
import { PostsListing } from "./PostsListing";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useLogInPresenter } from "@/auth/login/LogInPresenter";

const InternalPosts = () => {
  const [searchQuery] = useSearchQueryRepository();
  const { isLoggedIn } = useLogInPresenter();
  const { posts, isLoading, loadPosts, fetchCompleted } =
    usePostsPresenter(searchQuery);

  useEffect(() => {
    loadPosts();
  }, []);

  if (isLoading) {
    return <PostsSkeleton />;
  }

  return (
    <div className="gap-4 flex flex-col">
      {searchQuery && <SearchHeading searchQuery={searchQuery} />}
      {!posts.length && fetchCompleted && <PostsNotFound />}
      {posts && <PostsListing isAuthorsAvailable={isLoggedIn} posts={posts} />}
    </div>
  );
};

export const Posts = () => {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <InternalPosts />
      </RecoilRoot>
    </ErrorBoundary>
  );
};
