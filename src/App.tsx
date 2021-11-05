import "./App.css";
import MainWrapper from "./components/main-wrapper/MainWrapper";
import Router from "./config/router/Router";
import { routes } from "./config/router/routing";

const App: React.FC = () => {
  return (
    <MainWrapper>
      <Router routes={routes} />
    </MainWrapper>
  );
};

export default App;
