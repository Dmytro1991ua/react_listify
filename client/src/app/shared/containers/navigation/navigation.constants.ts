import { CSSObject, Theme } from '@mui/material';

export const DRAWER_OPENED_WIDTH = 292;
export const DRAWER_CLOSED_WIDTH = 80;

export const openedSidebarMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_OPENED_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

export const closedSidebarMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_CLOSED_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});
