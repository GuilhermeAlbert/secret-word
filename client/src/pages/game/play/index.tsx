import { Header } from "../../../components/header";

export function PlayGamePage(): JSX.Element {
  return (
    <>
      <div className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <Header title={"Play!"} />
        </div>
      </div>
    </>
  );
}
