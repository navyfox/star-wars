import { configureStore } from '@reduxjs/toolkit';
import { peopleSlice } from '@/entities/people';
import { createWrapper } from 'next-redux-wrapper';
import { peopleApi } from '@/shared/api/people';

export const makeStore = () =>
  configureStore({
    reducer: {
      [peopleSlice.name]: peopleSlice.reducer,
      [peopleApi.reducerPath]: peopleApi.reducer,
    },
    middleware: (gDM) => gDM().concat(peopleApi.middleware),
    devTools: true,
  });

export const wrapperStore = createWrapper<AppStore>(makeStore);
