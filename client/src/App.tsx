import "./App.css";
import AppProvider from "./app/contexts/app";
import { MainLayout } from "./layouts/main";
import { MainNavigator } from "./navigator";

function App() {
  return (
    <AppProvider>
      <MainLayout>
        <MainNavigator />
      </MainLayout>
    </AppProvider>
  );
}

export default App;
