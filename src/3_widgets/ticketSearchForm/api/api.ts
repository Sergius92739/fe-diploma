import { baseApi } from '6_shared';
import { TDirectionObject } from '../model/types';

type TQueryArg = {
  fromCityId: string;
  toCityId: string;
  dateStart?: string;
  dateEnd?: string;
};

export const ticketSearchFormApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getByDirections: build.query<TDirectionObject[], TQueryArg>({
      query: ({ fromCityId, toCityId }) =>
        `/routes?from_city_id=${fromCityId}&to_city_id=${toCityId}`
    }),
    getByDirectionStartDate: build.query<TDirectionObject[], TQueryArg>({
      query: ({ fromCityId, toCityId, dateStart }) =>
        `/routes?from_city_id=${fromCityId}&to_city_id=${toCityId}&date_start=${dateStart}`
    }),
    getByDirectionStartDateEndDate: build.query<TDirectionObject[], TQueryArg>({
      query: ({ fromCityId, toCityId, dateStart, dateEnd }) =>
        `/routes?from_city_id=${fromCityId}&to_city_id=${toCityId}&date_start=${dateStart}&date_end=${dateEnd}`
    })
  })
});

export const {
  useGetByDirectionsQuery,
  useGetByDirectionStartDateQuery,
  useGetByDirectionStartDateEndDateQuery
} = ticketSearchFormApi;
