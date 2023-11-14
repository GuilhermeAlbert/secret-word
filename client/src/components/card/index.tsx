import { Badge } from "../badge";
import { PrimaryButton } from "../buttons/primary";
import { CardProps } from "./types";

export function Card({ title, subtitle, onClick }: CardProps): JSX.Element {
  return (
    <div className="p-6 bg-gray-200 border border-black rounded-lg shadow">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          Tip: {title}
        </h5>
      </a>

      <div className="mt-5 mb-5">
        <p className="font-normal text-gray-700">Room:</p>

        <Badge title={subtitle} />
      </div>

      <div className="flex flex-wrap">
        <div className="w-full">
          <PrimaryButton
            title={"Play"}
            onClick={onClick}
            endIcon={
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
