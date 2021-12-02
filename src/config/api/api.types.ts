export interface IAuthRequest {
  username: string;
  password: string;
}

export interface ICreateCompany {
  name: string;
  registerNumber: string;
}

export interface ICreateStation {
  name: string;
  placement: string;
  stationEnergyType: string;
  supportGovernment: string;
  exploitationStart: Date;
  countryId: string; //temporary solutions, should be number
  regionId: string; //temporary solutions, should be number
}

export interface ICreateEAC {
  creationEnergyStartDate: Date;
  creationEnergyEndDate: Date;
  energyAmount: number;
  stationId:  number
}

export interface IChangeAskAuctionState {
  isAsk: boolean;
  price: number;
}

export interface IMakeBid {
  eacsId: number;
  price: number;
}
