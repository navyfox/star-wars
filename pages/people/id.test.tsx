import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PersonPage from './[id].page';

const mockStore = configureStore([thunk]);

describe('PersonPage', () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({
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
  });
  it('renders correctly', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <PersonPage />
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders the page with a person card', () => {
    render(
      <Provider store={store}>
        <PersonPage />
      </Provider>
    );
    const personCard = screen.getByTestId('person-card');
    expect(personCard).toBeInTheDocument();
  });

  it('dispatches setPerson action when input value changes', () => {
    render(
      <Provider store={store}>
        <PersonPage />
      </Provider>
    );
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Anakin Skywalker' } });
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'people/setPerson', payload: { name: 'Anakin Skywalker' } },
      { type: 'people/setIsSaving', payload: false },
    ]);
  });
});
