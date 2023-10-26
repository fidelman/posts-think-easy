import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useSearchQueryRepository = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const router = useRouter();
  const pathname = usePathname();

  const setSearchQuery = useCallback(
    (searchQuery: string | null) => {
      if (!searchQuery) {
        router.replace(pathname);
      } else {
        router.replace(`${pathname}?q=${searchQuery}`);
      }
    },
    [pathname, router]
  );

  return [searchQuery, setSearchQuery] as const;
};
