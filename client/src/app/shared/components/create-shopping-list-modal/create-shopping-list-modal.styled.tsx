import { styled } from '@mui/material';

import Select from '../select/general-select/general-select';

export const CurrenciesSelect = styled(Select, { shouldForwardProp: (prop) => prop !== 'isShoppingList' })<{
  isShoppingList?: boolean;
}>`
  margin-top: ${({ theme, isShoppingList }) => (isShoppingList ? theme.spacing(15) : 0)};

  & .MuiOutlinedInput-root {
    padding-left: 0;
  }

  & .MuiSelect-select {
    padding: ${({ theme }) => `${theme.spacing(12)} ${theme.spacing(16)} ${theme.spacing(12)} ${theme.spacing(5)} `};
  }
`;
