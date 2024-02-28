import { IUseReducerFormState } from './types';

export const initialFormState: IUseReducerFormState = {
  startCityInputValue: '',
  endCityInputValue: '',
  departureDateInputValue: '',
  arrivalDateInputValue: '',
  selectedDayPickerDeparture: undefined,
  selectedDayPickerArrival: undefined
};
