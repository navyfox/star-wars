import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPerson } from '@/entities/people';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import WrapperCard from '@/shared/ui/wrapper-card';
import { Person } from '@/shared/api/people';

export const PersonEditCard = ({
  person,
  onChangePerson,
}: {
  person: Person | null;
  onChangePerson: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}) => {
  if (!person) return null;
  return (
    <WrapperCard>
      <Stack
        spacing={{ xs: 2, sm: 4 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        sx={{ '& > *': { flexGrow: 1 } }}
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          defaultValue={person?.name}
          onChange={onChangePerson}
        />
        <TextField
          id="height"
          label="Height"
          variant="outlined"
          defaultValue={person?.height}
          onChange={onChangePerson}
        />
        <TextField
          id="mass"
          label="Mass"
          variant="outlined"
          defaultValue={person?.mass}
          onChange={onChangePerson}
        />
        <TextField
          id="hair_color"
          label="Hair color"
          variant="outlined"
          defaultValue={person?.hair_color}
          onChange={onChangePerson}
        />
        <TextField
          id="skin_color"
          label="Skin Color"
          variant="outlined"
          defaultValue={person?.skin_color}
          onChange={onChangePerson}
        />
        <TextField
          id="eye_color"
          label="Eye color"
          variant="outlined"
          defaultValue={person?.eye_color}
          onChange={onChangePerson}
        />
        <TextField
          id="birth_year"
          label="Birth year"
          variant="outlined"
          defaultValue={person?.birth_year}
          onChange={onChangePerson}
        />
        <TextField
          id="gender"
          label="Gender"
          variant="outlined"
          defaultValue={person?.gender}
          onChange={onChangePerson}
        />
      </Stack>
    </WrapperCard>
  );
};

export default PersonEditCard;
