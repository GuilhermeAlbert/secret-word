import { Navbar } from "../../components/navbar";
import { MainLayoutProps } from "./types";

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <Navbar />

      <div
        className="flex flex-col justify-center mt-5 mb-40 pl-20 pr-20"
        style={{ paddingTop: "65px" }}
      >
        {children}
      </div>
    </>
  );
}
