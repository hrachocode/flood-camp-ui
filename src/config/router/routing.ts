import { ComponentType, lazy, LazyExoticComponent, ReactNode } from "react";

export interface IRoute {
  path: string;
  exact?: boolean;
  fallback?: NonNullable<ReactNode> | null;
  component?: LazyExoticComponent<ComponentType<any>>;
  routes?: IRoute[];
  redirect?: string;
  private?: boolean;
}

export const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("../../pages/dashboard/Dashboard")),
    fallback: null,
    private: true,
  },
  {
    path: "/create-station",
    exact: true,
    component: lazy(() => import("../../pages/dashboard/Dashboard")),
    fallback: null,
    private: true,
  },
  {
    path: "/create-eac",
    exact: true,
    component: lazy(() => import("../../pages/dashboard/Dashboard")),
    fallback: null,
    private: true,
  },
  {
    path: "/login",
    exact: true,
    component: lazy(() => import("../../pages/auth/Auth")),
    fallback: null,
    private: false,
  },
  {
    path: "/sign-up",
    exact: true,
    component: lazy(() => import("../../pages/auth/Auth")),
    fallback: null,
    private: false,
  },
];
