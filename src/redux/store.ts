import {configureStore, StoreEnhancer} from '@reduxjs/toolkit';
import {storyApi} from './reducers/storyApi';

import {offline} from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import {userApi} from './reducers/userApi';

export const store = configureStore({
  reducer: {
    [storyApi.reducerPath]: storyApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  enhancers: [offline({...offlineConfig}) as StoreEnhancer],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([storyApi.middleware, userApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
