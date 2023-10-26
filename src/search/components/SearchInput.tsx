"use client";
import { ZoomIcon } from "@/search/components/ZoomIcon";
import { useSearchInputPresenter } from "../SearchInputPresenter";

export const SearchInput = () => {
  const { isVisible, handleChange, inputValue } = useSearchInputPresenter();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex w-60 items-center rounded-full bg-gray-100 px-3.5 py-3">
      <ZoomIcon />
      <input
        className="ml-2 w-auto text-base outline-none text-gray-600 bg-transparent"
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};
