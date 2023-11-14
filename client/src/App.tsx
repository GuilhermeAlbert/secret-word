import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./app/enums/route.enum";
import { Navbar } from "./components/navbar";
import { CreateGamePage } from "./pages/game/create";
import { ListGamesPage } from "./pages/game/list";
import { PlayGamePage } from "./pages/game/play";

function App() {
  return (
    <Router>
      <Navbar />

      <div
        className="flex flex-col justify-center items-center mt-5 mb-40"
        style={{ paddingTop: "65px" }}
      >
        <Routes>
          <Route path={AppRoutes.CreateGame} element={<CreateGamePage />} />
          <Route path={AppRoutes.ListGames} element={<ListGamesPage />} />
          <Route path={AppRoutes.PlayGame} element={<PlayGamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
