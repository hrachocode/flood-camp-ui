import { ComponentType, lazy, LazyExoticComponent, ReactNode } from "react";
import CreateCompany from "../../components/form-steps/create-company/CreateCompnay";
import CreateEAC from "../../components/form-steps/create-EAC/CreateEAC";
import CreateStation from "../../components/form-steps/create-station/CreateStation";
import ListOfEacs from "../../components/table/ListOfEacs";

export interface IRoute {
  path: string;
  exact?: boolean;
  fallback?: NonNullable<ReactNode> | null;
  component?: LazyExoticComponent<ComponentType<any>> | ComponentType;
  routes?: IRoute[];
  redirect?: string;
  private?: boolean;
}

export const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: ListOfEacs,
    fallback: null,
    private: true,
  },
  {
    path: "/create-company",
    exact: true,
    component: CreateCompany,
    fallback: null,
    private: true,
  },
  {
    path: "/create-station",
    exact: true,
    component: CreateStation,
    fallback: null,
    private: true,
  },
  {
    path: "/create-eac",
    exact: true,
    component: CreateEAC,
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
