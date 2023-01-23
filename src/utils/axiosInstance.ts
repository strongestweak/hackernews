import {BaseQueryFn} from '@reduxjs/toolkit/dist/query';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
});

export interface AxiosBaseQueryParams {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
}

export const axiosBaseQuery =
  (
    {baseUrl}: {baseUrl: string} = {baseUrl: ''},
  ): BaseQueryFn<AxiosBaseQueryParams, unknown, unknown> =>
  async ({url, method = 'GET', data, params}) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosInstance;
