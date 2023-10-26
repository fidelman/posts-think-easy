import { useDebounce } from "@/search/hooks/useDebounce";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { useSearchQueryRepository } from "./SearchQueryRepository";

const isVisible = (pathname: string) =>
  // Visible only on root page
  pathname === "/";

export const useSearchInputPresenter = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useSearchQueryRepository();
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  return {
    inputValue: inputValue ?? "",
    handleChange,
    isVisible: isVisible(pathname),
  };
};
