import clsx from "clsx";

export interface InputProps {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  return (
    <label htmlFor={props.id} className=" text-gray-800 relative">
      <span className="block mb-1">{props.label}</span>
      <input
        className={clsx(
          "w-full  p-2 rounded outline-none mb-4 border ",
          props.error ? "border-red-600" : "border-gray-200"
        )}
        type={props.type}
        name={props.id}
        id={props.id}
        onChange={props.onChange}
      />
      {props.error && (
        <span className="text-red-600 absolute left-0 -bottom-1 font-light text-sm">
          {props.error}
        </span>
      )}
    </label>
  );
};
