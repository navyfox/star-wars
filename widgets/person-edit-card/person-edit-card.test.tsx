import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import PersonEditCard from './index';

const TEST_PERSON = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
};

describe('person-edit-card', () => {
  it('renders correctly', () => {
    const component = renderer
      .create(<PersonEditCard person={TEST_PERSON} onChangePerson={() => {}} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders all input fields with correct default values', () => {
    const { getByLabelText } = render(
      <PersonEditCard person={TEST_PERSON} onChangePerson={() => {}} />
    );

    expect(getByLabelText('Name')).toHaveValue('Luke Skywalker');
    expect(getByLabelText('Height')).toHaveValue('172');
    expect(getByLabelText('Mass')).toHaveValue('77');
    expect(getByLabelText('Hair color')).toHaveValue('blond');
    expect(getByLabelText('Skin Color')).toHaveValue('fair');
    expect(getByLabelText('Eye color')).toHaveValue('blue');
    expect(getByLabelText('Birth year')).toHaveValue('19BBY');
    expect(getByLabelText('Gender')).toHaveValue('male');
  });
});
