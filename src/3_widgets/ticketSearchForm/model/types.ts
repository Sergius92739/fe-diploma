import { TCityObj } from '4_features';

export interface ITicketSearchState {
  selectedStartCityObject: TCityObj | null;
  selectedEndCityObject: TCityObj | null;
  selectedDepartureDate: string;
  selectedArrivalDate: string;
}

export interface IUseReducerFormState {
  startCityInputValue: string;
  endCityInputValue: string;
  departureDateInputValue: string;
  arrivalDateInputValue: string;
  selectedDayPickerDeparture: Date | undefined;
  selectedDayPickerArrival: Date | undefined;
}

export type TUseReducerAction =
  | { type: 'SET_START_CITY_INPUT_VALUE'; value: string }
  | { type: 'SET_END_CITY_INPUT_VALUE'; value: string }
  | { type: 'SET_DEPARTURE_DATE_INPUT_VALUE'; value: string }
  | { type: 'SET_ARRIVAL_DATE_INPUT_VALUE'; value: string }
  | { type: 'SET_SELECTED_DAY_PICKER_DEPARTURE'; value: Date | undefined }
  | { type: 'SET_SELECTED_DAY_PICKER_ARRIVAL'; value: Date | undefined };

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
  available_seats_info: {
    second: number;
  };
  departure: {
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
    available_seats_info: {
      second: number;
    };
    train: {
      _id: string;
      name: string;
    };
    from: {
      railway_station_name: string;
      city: {
        _id: string;
        name: string;
      };
      datetime: number;
    };
    to: {
      railway_station_name: string;
      city: {
        _id: string;
        name: string;
      };
      datetime: number;
    };
    price_info: {
      second: {
        top_price: number;
        bottom_price: number;
      };
    };
  };
};
