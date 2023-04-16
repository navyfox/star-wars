import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { HYDRATE } from 'next-redux-wrapper';
import { Person } from '@/shared/api/people';

// mock
const savePersonApi = (person: Person | null) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('SAVE_PERSON'), person;
      resolve({ isSaving: true });
    }, 1000);
  });

export interface PeopleState {
  person: Person | null;
  isSaving: boolean;
  isPending: boolean;
  error: string | null;
}

const initialState: PeopleState = {
  person: null,
  isSaving: true,
  isPending: false,
  error: null,
};

const hydrate = createAction<{ people: PeopleState }>(HYDRATE);

export const savePerson = createAsyncThunk(
  'people/savePerson',
  async (person: Person | null, { rejectWithValue }) => {
    try {
      const response = await savePersonApi(person);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPerson(state, action) {
      state.person = { ...state.person, ...action.payload };
    },
    setIsSaving(state, action) {
      state.isSaving = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload.people,
      };
    });
    builder.addCase(savePerson.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(savePerson.fulfilled, (state, action) => {
      state.isSaving = (action.payload as { isSaving: boolean }).isSaving;
    });
    builder.addCase(savePerson.rejected, (state, action) => {
      state.isSaving = false;
      state.error = action.payload as string;
    });
  },
});

export const { setPerson, setIsSaving } = peopleSlice.actions;

export default peopleSlice.reducer;
