import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICitiesState, TCityObj } from '../../citiesTooltip/model/types';
import { TRootState } from '1_app/store';

const initialState: ICitiesState = {
  fromCity: null,
  toCity: null
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setFromCity: (state: ICitiesState, action: PayloadAction<TCityObj>) => {
      state.fromCity = action.payload;
    },
    setToCity: (state: ICitiesState, action: PayloadAction<TCityObj>) => {
      state.toCity = action.payload;
    },
    resetFromCity: (state: ICitiesState, action: PayloadAction<TCityObj>) => {
      state.fromCity =
        state.fromCity?._id === action.payload._id ? null : state.fromCity;
    },
    resetToCity: (state: ICitiesState, action: PayloadAction<TCityObj>) => {
      state.toCity =
        state.toCity?._id === action.payload._id ? null : state.toCity;
    }
  }
});

export const citiesReducer = citiesSlice.reducer;
