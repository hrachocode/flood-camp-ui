import "./App.css";
import MainWrapper from "./components/main-wrapper/MainWrapper";
import Router from "./router/Router";
import { routes } from "./router/routing";

const App: React.FC = () => {
  return (
    <MainWrapper>
      <Router routes={routes} />
    </MainWrapper>
  );
};

export default App;
