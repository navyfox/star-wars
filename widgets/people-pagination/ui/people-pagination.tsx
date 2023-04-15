import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import { Person } from '@/shared/api/people';
import { WrapperCard } from '@/shared/ui/wrapper-card/styles';

const PAGE_SIZE = 10;

const STAR_WARS_API = process.env.NEXT_PUBLIC_STAR_WARS_API || '';

export const PeoplePagination = ({
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
      <Grid
        id="wrap"
        container
        marginTop={5}
        rowSpacing={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {people.map((person, index) => (
          <Grid width="100%" xs={12} sm={6} key={index}>
            <Link
              id={`person-${person.url.replace(/[^\d]+/g, '')}`}
              data-testid="person-card"
              style={{ textDecoration: 'none' }}
              href={person?.url.replace(STAR_WARS_API, '')}
              target="_blank"
            >
              <WrapperCard>
                <Box>name: {person.name}</Box>
                <Box>gender: {person.gender}</Box>
                <Box>height: {person.height}</Box>
                <Box>mass: {person.mass}</Box>
              </WrapperCard>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Stack marginTop={5} alignItems="center">
        <Pagination
          page={page}
          count={Math.ceil(count / PAGE_SIZE)}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              data-testid="pages"
              href={`/people/${item.page === 1 ? '' : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </Stack>
    </>
  );
};

export default PeoplePagination;
