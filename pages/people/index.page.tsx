import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Container from '@mui/material/Container';
import { getPeopleByPage } from '@/shared/api/people';
import { Person } from '@/shared/api/people';
import PeoplePagination from '@/widgets/people-pagination';

export const PeoplePage = ({
  count,
  people,
  page,
}: {
  count: number;
  people: Person[];
  page: number;
}) => {
  return (
    <>
      <Head>
        <title>People from Star Wars</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxWidth="sm">
        <PeoplePagination count={count} people={people} page={page} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query: { page = '1' } }) => {
  const pageIndex = Array.isArray(page) ? parseInt(page[0]) : parseInt(page) || 1;
  const data = await getPeopleByPage(pageIndex);

  return { props: { people: data.results, count: data.count, page: pageIndex } };
};

export default PeoplePage;
