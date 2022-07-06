import { Drawer, styled } from '@mui/material';

export const DrawerContainer = styled(Drawer)`
  position: relative;
  width: 29.2rem;
  overflow: initial;

  & .MuiDrawer-paper {
    position: fixed;
    overflow: initial;
    width: 29.2rem;
  }
`;
