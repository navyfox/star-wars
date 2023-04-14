import React, { ChangeEvent } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { setPerson } from '@/entities/people';
import { wrapperStore } from '@/app/store';
import Box from '@mui/material/Box';
import PersonEditCard from '@/widgets/person-edit-card';
import { getPersonByID } from '@/shared/api/people';
import { Person } from '@/shared/api/people';

export const PersonPage = () => {
  const dispatch = useDispatch();
  const person = useSelector((state: AppState) => state.people.person);

  const onChangePerson = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(
      setPerson({
        [event.target.id]: event.target.value,
      })
    );
  };
  return (
    <>
      <Head>
        <title>People from Star Wars</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxWidth="sm">
        <Box marginTop={5}>
          <PersonEditCard person={person} onChangePerson={onChangePerson} />
        </Box>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperStore.getServerSideProps(
  (store) =>
    async ({ query: { id = '1' } }) => {
      const pageIndex = Array.isArray(id) ? parseInt(id[0]) : parseInt(id) || 1;
      const person = await getPersonByID(pageIndex).then((resp) => resp.data as Person);
      await store.dispatch(setPerson(person));
      return { props: {} };
    }
);

export default PersonPage;
