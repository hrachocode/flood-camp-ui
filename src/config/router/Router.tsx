import SubRouting from "./SubRouting";
import { Switch } from "react-router-dom";
import { IRoute } from "./routing";

interface IProps {
  routes: IRoute[];
}

const Router: React.FC<IProps> = ({ routes }) => {
  return (
    <Switch>
      {routes &&
        routes.map((route: IRoute) => (
          <SubRouting key={route.path} {...route} />
        ))}
    </Switch>
  );
};

export default Router;
