import { styled } from '@mui/material/styles';
import { TextField as FormikMuiTextField } from 'formik-mui';

export const FormTextInputCustom = styled(FormikMuiTextField)`
  width: 100%;
  ${({ theme }) => theme.mixins.textInputCommonStylesMixin(theme)};
  ${({ theme }) => theme.mixins.textInputCommonErrorsStylesMixin(theme)};
`;
