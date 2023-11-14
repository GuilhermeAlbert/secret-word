import { PrimaryButtonProps } from "./types";

export function PrimaryButton({
  title,
  isLoading,
  endIcon,
  ...props
}: PrimaryButtonProps): JSX.Element {
  return (
    <button
      {...props}
      className="appearance-none block bg-black text-white border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500"
      type={props.type ?? "button"}
    >
      {isLoading ? (
        <span>Please, wait...</span>
      ) : (
        <span className="flex items-center">
          {title}
          <>{endIcon}</>
        </span>
      )}
    </button>
  );
}
