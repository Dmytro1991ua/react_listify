import { styled } from '@mui/material/styles';
import { TextField as FormikMuiTextField } from 'formik-mui';

export const FormTextInputCustom = styled(FormikMuiTextField)`
  width: 100%;
  ${({ theme }) => theme.mixins.textInputCommonStylesMixin(theme)};

  & .MuiFormHelperText-root {
    margin: ${({ theme }) => `${theme.spacing(4)} 0 0`};
    ${({ theme }) => theme.typography.subtitle1};

    &.Mui-error {
      bottom: ${({ theme }) => theme.spacing(-16)};
      color: ${({ theme }) => theme.palette.error.main};
    }
  }

  & .MuiOutlinedInput-root {
    &.Mui-error {
      background-color: #fbdee1;

      fieldset {
        border: ${({ theme }) => `1.5px solid ${theme.palette.error.main}`};
      }
    }
  }
`;
