import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "../app/enums/route.enum";
import { CreateGamePage } from "../pages/game/create";
import { ListGamesPage } from "../pages/game/list";
import { PlayGamePage } from "../pages/game/play";

export function MainNavigator(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoutes.CreateGame} element={<CreateGamePage />} />
      <Route path={AppRoutes.ListGames} element={<ListGamesPage />} />
      <Route path={AppRoutes.PlayGame} element={<PlayGamePage />} />
    </Routes>
  );
}
