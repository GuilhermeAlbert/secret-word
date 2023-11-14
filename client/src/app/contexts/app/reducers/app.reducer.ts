import { AppActions } from "../enums/actions.enum";
import { AppReducerActionOptions, AppReducerOptions } from "../types";

export const appReducer = (
  prevState: AppReducerOptions,
  action: AppReducerActionOptions
): AppReducerOptions => {
  switch (action.type) {
    case AppActions.RestoreUser:
      return {
        ...prevState,

        isLoading: false,
        userIdentifier: action.userIdentifier,
      };

    default:
      return prevState;
  }
};
