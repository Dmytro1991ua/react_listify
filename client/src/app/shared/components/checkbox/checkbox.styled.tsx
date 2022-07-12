import { Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomCheckbox = styled(Checkbox, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'size',
})<{ color?: string; customSize?: string }>`
  padding: 0;
  color: ${({ theme, color }) => (color ? color : theme.palette.success.dark)};

  & .MuiSvgIcon-root {
    width: ${({ customSize }) => customSize && customSize};
    height: ${({ customSize }) => customSize && customSize};
  }

  &.Mui-checked {
    color: ${({ theme, color }) => (color ? color : theme.palette.success.main)};
  }

  &.MuiCheckbox-indeterminate {
    color: ${({ theme, color }) => (color ? color : theme.palette.success.dark)};
  }
`;
