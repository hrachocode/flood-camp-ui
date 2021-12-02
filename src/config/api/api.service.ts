import {
  ALL_AUCTIONS,
  ASK_AUCTION_STATE,
  BINDED_ASKS_TO_EACS,
  CONFIRM_BID,
  CREATE_COMPANY,
  CREATE_EAC,
  CREATE_STATION,
  MAKE_BID,
  SIGN_IN,
  SIGN_UP,
} from "./api.endpoints";
import {
  IAuthRequest,
  IChangeAskAuctionState,
  ICreateCompany,
  ICreateEAC,
  ICreateStation,
  IMakeBid,
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

export const getStation = async (): Promise<any> => {
  const res = await httpClient.get(CREATE_STATION);
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

export const getBindedAsks = async (id: number) => {
  const res = await httpClient.get(`${CREATE_EAC}${BINDED_ASKS_TO_EACS}/${id}`);
  return res?.data;
};

export const confirmBidToEAC = async (id: number) => {
  const res = await httpClient.patch(`${CREATE_EAC}${CONFIRM_BID}/${id}`);
  return res?.data;
};

export const makeBid = async (body: IMakeBid) => {
  const res = await httpClient.post(`${CREATE_EAC}${MAKE_BID}`, body);
  return res?.data;
};
