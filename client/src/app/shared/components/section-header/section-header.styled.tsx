import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IoArrowBackOutline } from 'react-icons/io5';

import Button from '../button/button';

export const SectionHeaderWrapper = styled(Grid)`
  justify-content: center;
  gap: 1rem;
  padding-bottom: ${({ theme }) => theme.spacing(12)};
  border-bottom: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
  margin-bottom: ${({ theme }) => theme.spacing(30)};

  @media (width >= 38em) {
    justify-content: space-between;
  }

  h3 {
    font-size: clamp(1.8rem, -1.875rem + 5.5vw, 3rem);
  }

  div {
    button {
      font-size: clamp(1.2rem, -0.875rem + 2.5vw, 1.5rem);
    }
  }
`;

export const HeaderContentWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const ActionButtonsWrapper = styled('div')`
  @media (width >= 38em) {
    margin-left: auto;
  }
`;

export const SecondaryButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isShoppingListDetails' })<{
  isShoppingListDetails?: boolean;
}>`
  margin-right: ${({ theme, isShoppingListDetails }) => (isShoppingListDetails ? theme.spacing(16) : theme.spacing(0))};
`;

export const BackIcon = styled(IoArrowBackOutline)`
  width: 2rem;
  height: 2rem;

  @media (width >= 35em) {
    width: 3rem;
    height: 3rem;
  }
`;
