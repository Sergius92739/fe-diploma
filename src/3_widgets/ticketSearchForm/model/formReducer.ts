import { IUseReducerFormState, TUseReducerAction } from './types';

export const formReducer = (
  state: IUseReducerFormState,
  action: TUseReducerAction
): IUseReducerFormState => {
  switch (action.type) {
    case 'SET_START_CITY_INPUT_VALUE':
      return { ...state, startCityInputValue: action.value };
    case 'SET_END_CITY_INPUT_VALUE':
      return { ...state, endCityInputValue: action.value };
    case 'SET_DEPARTURE_DATE_INPUT_VALUE':
      return { ...state, departureDateInputValue: action.value };
    case 'SET_ARRIVAL_DATE_INPUT_VALUE':
      return { ...state, arrivalDateInputValue: action.value };
    case 'SET_SELECTED_DAY_PICKER_ARRIVAL':
      return { ...state, selectedDayPickerArrival: action.value };
    case 'SET_SELECTED_DAY_PICKER_DEPARTURE':
      return { ...state, selectedDayPickerDeparture: action.value };
    default:
      return state;
  }
};
