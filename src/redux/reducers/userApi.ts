import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../utils/axiosInstance';
import {User} from '../../utils/types';

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getUserDetails: builder.query<User, {id: string}>({
      query: ({id}) => ({url: `/user/${id}.json`}),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useLazyGetUserDetailsQuery} = userApi;
