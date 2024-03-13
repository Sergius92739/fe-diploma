import { TCityObj } from '4_features';

export interface ITicketSearchState {
  selectedStartCityObject: TCityObj | null;
  selectedEndCityObject: TCityObj | null;
  selectedDepartureDate: string;
  selectedArrivalDate: string;
  startCityInputValue: string;
  endCityInputValue: string;
  departureDateInputValue: string;
  arrivalDateInputValue: string;
}
