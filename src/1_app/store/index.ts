import { ticketSearchReducer } from '3_widgets/ticketSearchForm/model/ticketSearchSlice';
import { baseApi } from '6_shared';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    ticketSearch: ticketSearchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware)
});

setupListeners(store.dispatch);

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
