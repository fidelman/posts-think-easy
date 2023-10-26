interface SearchHeaderProps {
  searchQuery: string;
}

export const SearchHeading = (props: SearchHeaderProps) => {
  return (
    <h1 className="text-5xl font-semibold text-gray-500">
      Result for <span className="text-gray-800">{props.searchQuery}</span>
    </h1>
  );
};
