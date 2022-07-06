import { AppBar, styled } from '@mui/material';

export const HeaderWrapper = styled(AppBar)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
`;
