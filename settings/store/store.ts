import { configureStore } from '@reduxjs/toolkit';
import { peopleSlice } from '@/entities/people';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer: {
      [peopleSlice.name]: peopleSlice.reducer,
    },
    devTools: true,
  });

export const wrapperStore = createWrapper<AppStore>(makeStore);
