import { FormControlLabel, styled } from '@mui/material';
import { AiOutlineFileAdd } from 'react-icons/ai';

import TextInput from '../../shared/components/input/text-input/text-input';
import { ItemWrapper } from '../shopping-lists/shopping-lists.styled';

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

export const CheckboxLabel = styled(FormControlLabel)`
  margin-left: 0;
  margin-right: 0;
  margin-bottom: ${({ theme }) => theme.spacing(20)};
  padding-left: ${({ theme }) => theme.spacing(20)};
  padding-bottom: ${({ theme }) => theme.spacing(10)};
  border-bottom: ${({ theme }) => `2px solid ${theme.palette.success.dark}`};

  & .MuiTypography-root {
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: ${({ theme }) => theme.spacing(5)};
  }
`;

export const FallbackImageWrapper = styled(ItemWrapper)`
  height: auto;
`;
