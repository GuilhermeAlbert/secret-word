import { HeaderProps } from "./types";

export function Header({ title }: HeaderProps): JSX.Element {
  return (
    <div className="w-full md:w-12/12 px-3 mb-5">
      <h3 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
        {title}
      </h3>
    </div>
  );
}
