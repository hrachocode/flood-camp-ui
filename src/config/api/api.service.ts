import {
  CREATE_COMPANY,
  CREATE_EAC,
  CREATE_STATION,
  SIGN_IN,
  SIGN_UP,
} from "./api.endpoints";
import {
  IAuthRequest,
  ICreateCompany,
  ICreateEAC,
  ICreateStation,
} from "./api.types";
import { httpClient } from "./http-client";

export const postSignUp = async (body: IAuthRequest) => {
  const res = await httpClient.post(SIGN_UP, body);
  return res?.data;
};

export const postSignIn = async (body: IAuthRequest): Promise<any> => {
  const res = await httpClient.post(SIGN_IN, body);
  return res?.data;
};

export const postCreateCompany = async (body: ICreateCompany): Promise<any> => {
  const res = await httpClient.post(CREATE_COMPANY, body);
  return res?.data;
};

export const postCreateStation = async (body: ICreateStation): Promise<any> => {
  const res = await httpClient.post(CREATE_STATION, body);
  return res?.data;
};

export const postCreateEAC = async (body: ICreateEAC): Promise<any> => {
  const res = await httpClient.post(CREATE_EAC, body);
  return res?.data;
};
