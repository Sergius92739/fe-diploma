export interface IDirectionsData {
  items: TDirectionObject[];
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
