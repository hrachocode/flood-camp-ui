import { Suspense } from "react";
import { Redirect, Route } from "react-router-dom";

const SubRouting = (route: any) => {
  const authenticated: boolean = !!localStorage.getItem("accessToken");

  return (
    <Suspense fallback={route.fallback}>
      <Route
        path={route.path}
        render={(props: any) =>
          route.redirect ? (
            <Redirect to={route.redirect} />
          ) : route.private ? (
            authenticated ? (
              route.component && (
                <route.component {...props} routes={route.routes} />
              )
            ) : (
              <Redirect to="/login" />
            )
          ) : authenticated &&
            (route.path === "/login" || route.path === "/sign-up") ? (
            <Redirect to="/" />
          ) : (
            route.component && (
              <route.component {...props} routes={route.routes} />
            )
          )
        }
      />
    </Suspense>
  );
};

export default SubRouting;
