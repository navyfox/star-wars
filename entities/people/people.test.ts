import peopleSliceReducer, { setPerson, peopleSlice, PeopleState } from './people';
import { HYDRATE } from 'next-redux-wrapper';

describe('peopleSlice', () => {
  let initialState: PeopleState;

  beforeEach(() => {
    initialState = {
      person: null,
      isSaving: true,
      isPending: false,
      error: null,
    };
  });

  it('should handle the setPerson action', () => {
    const person = { name: 'Luke Skywalker' };
    const newState = peopleSliceReducer(initialState, setPerson(person));

    expect(newState.person).toEqual(person);
  });

  it('should handle the HYDRATE action', () => {
    const payload = {
      people: {
        person: {
          name: 'Anakin Skywalker',
        },
      },
    };
    const newState = peopleSlice.reducer(initialState, { type: HYDRATE, payload });

    expect(newState.person).toEqual(payload.people.person);
  });
});
