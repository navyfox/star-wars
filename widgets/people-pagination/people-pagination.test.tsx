import React from 'react';
import { render } from '@testing-library/react';
import { Person } from '@/shared/api/people';
import renderer from 'react-test-renderer';
import PeoplePagination from './index';

const mockPeople: Person[] = [
  {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    gender: 'male',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    gender: 'female',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    url: 'https://swapi.dev/api/people/5/',
  },
];

describe('PeoplePagination', () => {
  it('renders correctly', () => {
    const component = renderer
      .create(<PeoplePagination count={mockPeople.length} people={mockPeople} page={1} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders the correct number of people cards', async () => {
    const { queryAllByTestId } = await render(
      <PeoplePagination count={mockPeople.length} people={mockPeople} page={1} />
    );
    expect(await queryAllByTestId('person-card', { exact: false })).toHaveLength(mockPeople.length);
  });

  it('renders pagination with correct page count', () => {
    const pageSize = 10;
    const { queryAllByTestId } = render(
      <PeoplePagination count={30} people={mockPeople} page={1} />
    );
    const pagination = queryAllByTestId('pages');
    expect(pagination).toHaveLength(Math.ceil(30 / pageSize) + 2);
  });
});
