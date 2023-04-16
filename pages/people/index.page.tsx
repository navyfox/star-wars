import React from 'react';
import type { NextPage } from 'next/types';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Container from '@mui/material/Container';
// import { getPeopleByPage } from '@/shared/api/people';
import { Person } from '@/shared/api/people';
import PeoplePagination from '@/widgets/people-pagination';
import {
  getPeopleByPage,
  getRunningQueriesThunk,
  useGetPeopleByPageQuery,
} from '@/shared/api/people';
import { wrapperStore } from '@/settings/store';
import { skipToken } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/router';

interface PeoplePageProps {
  count: number;
  people: Person[];
  page: number;
}

export const PeoplePage: NextPage = () => {
  const router = useRouter();

  const page = router.query.page || '1';
  const result = useGetPeopleByPageQuery(typeof page === 'string' ? Number(page) : skipToken, {
    // If the page is not yet generated, router.isFallback will be true
    // initially until getStaticProps() finishes running
    skip: router.isFallback,
  });
  const { isLoading, error, data } = result;
  if (!data) return null;
  return (
    <>
      <Head>
        <title>People from Star Wars</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxWidth="sm">
        <PeoplePagination count={data?.count} people={data?.results} page={Number(page)} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperStore.getServerSideProps(
  (store) =>
    async ({ query: { page = '1' } }) => {
      const pageIndex = Array.isArray(page) ? parseInt(page[0]) : parseInt(page) || 1;

      store.dispatch(getPeopleByPage.initiate(pageIndex));

      await Promise.all(store.dispatch(getRunningQueriesThunk()));
      // const data = await getPeopleByPage(pageIndex);

      return { props: {} };
      // return { props: { people: data.results, count: data.count, page: pageIndex } };
    }
);

export default PeoplePage;
