import { createSlice } from '@reduxjs/toolkit';
// import { AppState } from "@/app/store";
import { HYDRATE } from 'next-redux-wrapper';
import { Person } from '@/shared/api/people';

export interface PeopleState {
  person: Person | null;
}

const initialState: PeopleState = {
  person: null,
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPerson(state, action) {
      state.person = { ...state.person, ...action.payload };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.people,
      };
    },
  },
});

export const { setPerson } = peopleSlice.actions;

// export const selectAuthState = (state: AppState) => state.auth.authState;

export default peopleSlice.reducer;
