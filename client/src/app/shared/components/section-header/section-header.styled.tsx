import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IoArrowBackOutline } from 'react-icons/io5';

import Button from '../button/button';

export const SectionHeaderWrapper = styled(Grid)`
  padding-bottom: ${({ theme }) => theme.spacing(12)};
  border-bottom: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
  margin-bottom: ${({ theme }) => theme.spacing(30)};

  h3 {
    font-size: clamp(1.8rem, -0.875rem + 8.5vw, 3rem);
  }

  div {
    button {
      font-size: clamp(1.2rem, -0.875rem + 5.5vw, 1.5rem);
    }
  }
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
