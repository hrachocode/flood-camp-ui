import {
  ALL_AUCTIONS,
  ASK_AUCTION_STATE,
  CREATE_COMPANY,
  CREATE_EAC,
  CREATE_STATION,
  SIGN_IN,
  SIGN_UP,
} from "./api.endpoints";
import {
  IAuthRequest,
  IChangeAskAuctionState,
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

export const getEACs = async (): Promise<any> => {
  const res = await httpClient.get(CREATE_EAC);
  return res?.data;
};

export const changeEACAskAucitonState = async (
  id: number,
  body: IChangeAskAuctionState
): Promise<any> => {
  const res = await httpClient.patch(
    `${CREATE_EAC}${ASK_AUCTION_STATE}/${id}`,
    body
  );
  return res?.data;
};

export const getAllEACsInAuctions = async () => {
  const res = await httpClient.get(`${CREATE_EAC}${ALL_AUCTIONS}`);
  return res?.data;
};
