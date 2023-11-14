import { AppActions } from "./enums/actions.enum";

export interface AppContextOptions {
  state: AppReducerOptions;
}

export interface AppReducerOptions {
  isLoading: boolean;
  userIdentifier: string | undefined;
}

export interface AppProviderOptions {
  children: JSX.Element | JSX.Element[];
}

export type AppReducerActionOptions = {
  type: AppActions.RestoreUser;
  userIdentifier: string | undefined;
};
