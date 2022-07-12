import { TextField, styled } from '@mui/material';

export const TextInputCustom = styled(TextField)`
  ${({ theme }) => theme.mixins.textInputCommonStylesMixin(theme)};
`;
