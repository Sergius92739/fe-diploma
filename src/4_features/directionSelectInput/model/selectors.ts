import { TRootState } from '1_app/store';

export const selectFromCity = (state: TRootState) => state.cities.fromCity;
export const selectToCity = (state: TRootState) => state.cities.toCity;
