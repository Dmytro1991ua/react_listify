import { Button, styled } from '@mui/material';

export const CustomButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'fullWidth' })<{
  fullWidth?: boolean;
}>`
  min-width: auto;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  text-transform: none;
  border-radius: 3px;
  ${({ theme }) => theme.typography.h5};
  font-weight: bold;

  &:disabled {
    opacity: 40%;
    pointer-events: initial;
    cursor: not-allowed;
  }
`;
