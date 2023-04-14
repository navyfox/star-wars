// import { configureStore } from '@reduxjs/toolkit';

import heroModel from '@/entities/people';

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
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
