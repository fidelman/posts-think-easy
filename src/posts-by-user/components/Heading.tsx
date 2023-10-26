interface HeadingProps {
  userName: string;
}

export const Heading = (props: HeadingProps) => (
  <h1 className="text-5xl font-semibold text-gray-500">
    Posts by <span className="text-gray-800">{props.userName}</span>
  </h1>
);
