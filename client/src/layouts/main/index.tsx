import { Navbar } from "../../components/navbar";
import { MainLayoutProps } from "./types";

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <Navbar />

      <div
        className="flex flex-col justify-center mt-5 mb-40 md:pl-20 md:pr-20 pl-5 pr-5"
        style={{ paddingTop: "65px" }}
      >
        {children}
      </div>
    </>
  );
}
