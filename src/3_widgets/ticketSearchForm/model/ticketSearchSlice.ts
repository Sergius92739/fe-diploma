import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ITicketSearchState } from './types';
import { TCityObj } from '4_features';
import { TRootState } from '1_app/store';

const initialState: ITicketSearchState = {
  selectedStartCityObject: null,
  selectedEndCityObject: null,
  selectedDepartureDate: '',
  selectedArrivalDate: ''
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
    }
  }
});

export const {
  setSelectedStartCityObject,
  setSelectedEndCityObject,
  setSelectedDepartureDate,
  setSelectedArrivalDate
} = ticketSearchSlice.actions;
export const selectTicketSearch = (state: TRootState) => state.ticketSearch;
export const ticketSearchReducer = ticketSearchSlice.reducer;
