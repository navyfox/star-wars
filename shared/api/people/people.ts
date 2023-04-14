import axios from 'axios';
import { Person } from './types';

export const getPeopleByPage = async (page: number | string) =>
  axios
    .get(`${process.env.NEXT_PUBLIC_STAR_WARS_API}/people/?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((resp) => resp.data as { count: number; results: Person[] });

export const getPersonByID = async (id: number | string) =>
  axios.get(`${process.env.NEXT_PUBLIC_STAR_WARS_API}/people/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
