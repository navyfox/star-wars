import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useGetPeopleByPageQuery } from '@/shared/api/people';
import { Person } from '@/shared/api/people';
import PeoplePage from './index.page';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/shared/api/people');

describe('PeoplePage', () => {
  const mockedUseRouter = useRouter as jest.Mock;
  const mockedUseGetPeopleByPageQuery = useGetPeopleByPageQuery as jest.Mock;

  const mockPeople: Person[] = [
    {
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
  ];

  beforeEach(() => {
    mockedUseRouter.mockReturnValue({
      query: { page: '1' },
      isFallback: false,
    });

    mockedUseGetPeopleByPageQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        count: 87,
        results: mockPeople,
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the PeoplePagination component with the correct props', () => {
    render(<PeoplePage />);
    expect(mockedUseRouter).toHaveBeenCalled();
    expect(mockedUseGetPeopleByPageQuery).toHaveBeenCalledWith(1, { skip: false });
    expect(screen.getByText('name: Luke Skywalker')).toBeInTheDocument();
  });

  it('renders nothing if data is null', () => {
    mockedUseGetPeopleByPageQuery.mockReturnValueOnce({
      isLoading: false,
      error: null,
      data: null,
    });
    render(<PeoplePage />);
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });
});
