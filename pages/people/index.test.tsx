import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import { PeoplePage, getServerSideProps } from './index.page';
import { getPeopleByPage, PeopleApiResponse } from '@/shared/api/people';
import renderer from 'react-test-renderer';

jest.mock('@/shared/api/people', () => ({
  getPeopleByPage: jest.fn(),
}));

describe('PeoplePage', () => {
  const props = {
    count: 0,
    people: [],
    page: 1,
  };

  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<PeoplePage {...props} />);
  });

  it('renders correctly', () => {
    const component = renderer.create(<PeoplePage {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should render without error', () => {
    const { container } = renderResult;
    expect(container).toBeInTheDocument();
  });
});

describe('getServerSideProps', () => {
  const mockApiResponse: PeopleApiResponse = {
    count: 10,
    results: [
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
    ],
  };

  beforeEach(() => {
    (getPeopleByPage as jest.Mock).mockResolvedValueOnce(mockApiResponse);
  });

  it('should return the expected props', async () => {
    const mockReq = {
      headers: {
        cookie: '',
      },
    } as any;

    const mockRes = {
      setHeader: jest.fn(),
      end: jest.fn(),
    } as any;

    const mockContext: GetServerSidePropsContext = {
      query: { page: '1' },
      req: mockReq,
      res: mockRes,
      resolvedUrl: '',
    };
    const { props } = (await getServerSideProps(mockContext)) as { props: Object };

    expect(getPeopleByPage).toHaveBeenCalledWith(1);
    expect(props).toHaveProperty('count', mockApiResponse.count);
    expect(props).toHaveProperty('people', mockApiResponse.results);
    expect(props).toHaveProperty('page', 1);
  });
});
