import { styled } from '@mui/material';
import { AiOutlineFileAdd } from 'react-icons/ai';

import TextInput from '../../shared/components/input/text-input/text-input';

export const Form = styled('form')`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto 4rem;
`;

export const Input = styled(TextInput)`
  width: 100%;

  & .MuiInputAdornment-positionStart {
    margin-right: -1.5rem;
  }

  & .MuiInputAdornment-positionEnd {
    margin-left: -4rem;
  }

  input {
    border: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};
    background-color: ${({ theme }) => theme.palette.common.white};
  }

  fieldset {
    border: none !important;
  }
`;

export const AddIcon = styled(AiOutlineFileAdd)`
  width: 2.5rem !important;
  height: 2.5rem !important;
  color: ${({ theme }) => `${theme.palette.success.dark} !important`};
`;
