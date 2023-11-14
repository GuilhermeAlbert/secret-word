import { useContextSelector } from "use-context-selector";
import { AppContext } from "..";
import { AppContextOptions } from "../types";

export function useApp() {
  const state = useContextSelector(
    AppContext,
    (app: AppContextOptions) => app.state
  );

  return {
    state,
  };
}
