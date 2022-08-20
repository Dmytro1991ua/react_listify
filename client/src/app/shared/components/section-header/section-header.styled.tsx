import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IoArrowBackOutline } from 'react-icons/io5';

import Button from '../button/button';

export const SectionHeaderWrapper = styled(Grid)`
  padding-bottom: ${({ theme }) => theme.spacing(12)};
  border-bottom: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
  margin-bottom: ${({ theme }) => theme.spacing(30)};
`;

export const SecondaryButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isShoppingListDetails' })<{
  isShoppingListDetails?: boolean;
}>`
  margin-right: ${({ theme, isShoppingListDetails }) => (isShoppingListDetails ? theme.spacing(16) : theme.spacing(0))};
`;

export const BackIcon = styled(IoArrowBackOutline)`
  width: 3rem;
  height: 3rem;
`;
