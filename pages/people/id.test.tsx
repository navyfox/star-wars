import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PersonPage from './[id].page';

const mockStore = configureStore([thunk]);

describe('PersonPage', () => {
  it('renders the page with a person card', () => {
    const store = mockStore({
      people: {
        person: {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          url: 'https://swapi.dev/api/people/1/',
        },
      },
    });
    render(
      <Provider store={store}>
        <PersonPage />
      </Provider>
    );
    // const pageTitle = screen.getByText('People from Star Wars');
    const personCard = screen.getByTestId('person-card');
    // expect(pageTitle).toBeInTheDocument();
    expect(personCard).toBeInTheDocument();
  });

  it('dispatches setPerson action when input value changes', () => {
    const store = mockStore({
      people: {
        person: {
          id: 1,
          name: 'Luke Skywalker',
          gender: 'male',
          height: '172',
          mass: '77',
        },
      },
    });
    render(
      <Provider store={store}>
        <PersonPage />
      </Provider>
    );
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Anakin Skywalker' } });
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'people/setPerson', payload: { name: 'Anakin Skywalker' } }]);
  });
});
