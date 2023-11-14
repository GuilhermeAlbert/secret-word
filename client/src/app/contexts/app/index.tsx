import { FC, useEffect, useReducer } from "react";
import { createContext } from "use-context-selector";
import { v4 as uuidv4 } from "uuid";
import { StorageKeys } from "../../enums/storage.enum";
import { AppActions } from "./enums/actions.enum";
import { appReducer } from "./reducers/app.reducer";
import {
  AppContextOptions,
  AppProviderOptions,
  AppReducerActionOptions,
  AppReducerOptions,
} from "./types";

export const AppContext = createContext<AppContextOptions>(
  {} as AppContextOptions
);

const appInitialState: AppReducerOptions = {
  isLoading: true,
  userIdentifier: undefined,
};

const AppProvider: FC<AppProviderOptions> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  /**
   * @returns {void}
   */
  useEffect((): void => {
    const dispatchPayload: AppReducerActionOptions = {
      type: AppActions.RestoreUser,
      userIdentifier: appInitialState.userIdentifier,
    };

    try {
      const userId: string | null = localStorage.getItem(
        StorageKeys.UserIdentifier
      );

      if (userId) {
        dispatchPayload.userIdentifier = userId;
      } else {
        const userIdentifier = uuidv4();
        dispatchPayload.userIdentifier = userIdentifier;

        localStorage.setItem(StorageKeys.UserIdentifier, userIdentifier);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(dispatchPayload);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
