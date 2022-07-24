import { styled } from '@mui/material';

import TextInput from '../../input/text-input/text-input';

export const CustomSelect = styled(TextInput)`
  ${({ theme }) => theme.mixins.textInputCommonErrorsStylesMixin(theme)};
`;
