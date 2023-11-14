import { TextInputProps } from "./types";

export function TextInput({
  label,
  error,
  ...props
}: TextInputProps): JSX.Element {
  return (
    <div className="w-full md:w-12/12 px-3 mb-6 md:mb-0">
      {label && (
        <label
          id={`${props.name}_label`}
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={props.name}
        >
          {label}
        </label>
      )}

      <input
        {...props}
        className="appearance-none block w-full bg-gray-100 text-gray-700 border-[1.5px] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id={props.id ?? props.name}
      />

      {error && (
        <p
          className="text-red-500 text-xs italic mb-6"
          id={`${props.name}_error`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
