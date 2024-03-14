import { FC, ReactNode } from 'react';

export interface IDirectionsData {
  items: TDirectionObject[];
}

export type T_TrainNameInfoProps = {
  trainName: string;
  fromCityName: string;
  toCityName: string;
  icon?: ReactNode;
};

export type T_DirectionTimeInfoProps = {
  fromDateTime: number;
  fromCityName: string;
  fromRailwayStation: string;
  duration: number;
  toDateTime: number;
  toCityName: string;
  toRailwayStation: string;
  arrow: ReactNode;
};

export type T_SeatsAndServiceInfoProps = {
  haveFirstClass: boolean;
  haveSecondClass: boolean;
  haveThirdClass: boolean;
  haveFourthClass: boolean;
  priceInfo:
    | {
        [key: string]: TClassPrices;
      }
    | undefined;
  availableSeatsInfo: TSeatsInfo;
  haveAirConditioning: boolean;
  haveWifi: boolean;
  isExpress: boolean;
  children?: ReactNode;
};

export interface IDirectionProps {
  // directionInfo: TDepartureArrival;
  TrainNameInfo: ReactNode;
  DirectionTimeInfo: ReactNode;
  SeatsAndServiceInfo: ReactNode;
  borderNone?: string;
}

export type TDirectionObject = {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  available_seats: number;
  available_seats_info: TSeatsInfo;
  seats_info?: TSeatsInfo;
  departure?: TDepartureArrival;
  arrival?: TDepartureArrival;
};

export type TSeatsInfo = {
  [key: string]: number;
  // first?: number;
  // second?: number;
  // third?: number;
  // fourth?: number;
};

export type TDepartureArrival = {
  _id: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  duration: number;
  available_seats: number;
  available_seats_info: TSeatsInfo;
  train: {
    _id: string;
    name: string;
  };
  from: TFromTo;
  to: TFromTo;
  price_info?: {
    [key: string]: TClassPrices;
    // first?: TClassPrices;
    // second?: TClassPrices;
    // third?: TClassPrices;
    // fourth?: TClassPrices;
  };
};

export type TFromTo = {
  railway_station_name: string;
  city: {
    _id: string;
    name: string;
  };
  datetime: number;
};

export type TClassPrices = {
  price: number;
  top_price: number;
  bottom_price: number;
  side_price: number;
  linens_price: number;
  wifi_price: number;
};
