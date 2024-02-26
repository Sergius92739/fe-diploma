import { API_URL } from '6_shared/config/envconfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  endpoints: () => ({})
});
