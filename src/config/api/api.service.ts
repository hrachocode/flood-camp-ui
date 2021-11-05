import { SIGN_IN, SIGN_UP } from "./api.endpoints";
import { httpClient } from "./http-client";

interface IAuthRequest {
  username: string;
  password: string;
}

export const postSignUp = async (body: IAuthRequest) => {
  const res = await httpClient.post(SIGN_UP, body);
  return res.data;
};

export const postSignIn = async (body: IAuthRequest): Promise<any> => {
  const res = await httpClient.post(SIGN_IN, body);
  return res.data;
};
