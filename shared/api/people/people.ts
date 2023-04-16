import axios from 'axios';
import { PeopleApiResponse } from './types';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const peopleApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_STAR_WARS_API}/`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getPeopleByPage: builder.query<PeopleApiResponse, number>({
      query: (page) => `people/?page=${page}`,
      keepUnusedDataFor: 120,
    }),
  }),
});

export const {
  useGetPeopleByPageQuery,
  util: { getRunningQueriesThunk },
} = peopleApi;

export const { getPeopleByPage } = peopleApi.endpoints;

export const getPersonByID = async (id: number | string) =>
  axios.get(`${process.env.NEXT_PUBLIC_STAR_WARS_API}/people/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
