import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../app/enums/route.enum";
import { NavbarItemProps } from "./types";

const NAVBAR_OPTIONS: NavbarItemProps[] = [
  { to: AppRoutes.CreateGame, title: "Create game" },
  { to: AppRoutes.ListGames, title: "My games" },
  { to: AppRoutes.PlayGame, title: "Play" },
];

export function NavbarItem({ title, to }: NavbarItemProps): JSX.Element {
  return (
    <Link
      to={to}
      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
    >
      {title}
    </Link>
  );
}

export function Navbar(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href={AppRoutes.ListGames}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Secret word
          </span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={() => navigate(AppRoutes.PlayGame)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Play
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {NAVBAR_OPTIONS.map((option: NavbarItemProps, index: number) => (
              <li key={`${option.to}_${index}`}>
                <NavbarItem to={option.to} title={option.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
