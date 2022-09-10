import { styled } from '@mui/material';

import TextInput from '../../../../shared/components/input/text-input/text-input';
import Select from '../../../../shared/components/select/general-select/general-select';

export const ModalInput = styled(TextInput)`
  & .MuiOutlinedInput-root {
    padding-left: 0;
    padding-right: 0;
  }

  & .MuiInputAdornment-root {
    margin-right: 0;
  }
`;

export const InputDivider = styled('div')`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(16)};
  }
`;

export const ModalSelect = styled(Select)`
  & .MuiOutlinedInput-root {
    padding-left: 0;
  }

  & .MuiSelect-select {
    padding: ${({ theme }) => `${theme.spacing(12)} ${theme.spacing(16)} ${theme.spacing(12)} ${theme.spacing(5)} `};
  }
`;
