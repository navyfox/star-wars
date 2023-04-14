import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const WrapperCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));
