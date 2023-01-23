import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../../utils/axiosInstance';
import {Story} from '../../utils/types';

// Define a service using a base URL and expected endpoints
export const storyApi = createApi({
  reducerPath: 'storyApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getTopStories: builder.query({
      query: () => ({url: '/topstories.json'}),
    }),
    getStory: builder.query<Story, {id: number}>({
      query: ({id}) => ({url: `/item/${id}.json`}),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTopStoriesQuery,
  useLazyGetTopStoriesQuery,
  useLazyGetStoryQuery,
} = storyApi;
