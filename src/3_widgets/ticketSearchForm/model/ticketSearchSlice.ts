import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITicketSearchState } from './types';
import { TCityObj } from '4_features';
import { TRootState } from '1_app/store';

const initialState: ITicketSearchState = {
  selectedStartCityObject: null,
  selectedEndCityObject: null,
  selectedDepartureDate: '',
  selectedArrivalDate: '',
  startCityInputValue: '',
  endCityInputValue: '',
  departureDateInputValue: '',
  arrivalDateInputValue: ''
};

export const ticketSearchSlice = createSlice({
  name: 'ticketSearch',
  initialState,
  reducers: {
    setSelectedStartCityObject(
      state: ITicketSearchState,
      action: PayloadAction<TCityObj>
    ) {
      state.selectedStartCityObject = action.payload;
    },
    setSelectedEndCityObject(
      state: ITicketSearchState,
      action: PayloadAction<TCityObj>
    ) {
      state.selectedEndCityObject = action.payload;
    },
    setSelectedDepartureDate(
      state: ITicketSearchState,
      action: PayloadAction<string>
    ) {
      state.selectedDepartureDate = action.payload;
    },
    setSelectedArrivalDate(
      state: ITicketSearchState,
      action: PayloadAction<string>
    ) {
      state.selectedArrivalDate = action.payload;
    },
    setStartCityInputValue(
      state: ITicketSearchState,
      action: PayloadAction<string>
    ) {
      state.startCityInputValue = action.payload;
    },
    setEndCityInputValue(
      state: ITicketSearchState,
      action: PayloadAction<string>
    ) {
      state.endCityInputValue = action.payload;
    },
    setDepartureDateInputValue(
      state: ITicketSearchState,
      action: PayloadAction<string>
    ) {
      state.departureDateInputValue = action.payload;
    },
    setArrivalDateInputValue(
      state: ITicketSearchState,
      action: PayloadAction<string>
    ) {
      state.arrivalDateInputValue = action.payload;
    }
  }
});

export const {
  setSelectedStartCityObject,
  setSelectedEndCityObject,
  setSelectedDepartureDate,
  setSelectedArrivalDate,
  setStartCityInputValue,
  setEndCityInputValue,
  setDepartureDateInputValue,
  setArrivalDateInputValue
} = ticketSearchSlice.actions;
export const selectTicketSearch = (state: TRootState) => state.ticketSearch;
export const ticketSearchReducer = ticketSearchSlice.reducer;
