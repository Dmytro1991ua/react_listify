import { Drawer, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiUserSettingsLine } from 'react-icons/ri';

import Button from '../../components/button/button';
import { LogoIcon, LogoTitle } from '../header/header.styled';
import { closedSidebarMixin, openedSidebarMixin } from './navigation.constants';

const CommonNavigationMenuIconStyles = `
  fill: #fff;
  width: 3rem;
  height: 3rem;
`;

export const DrawerContainer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })`
  position: relative;
  ${({ theme, open }) => (open ? openedSidebarMixin(theme) : closedSidebarMixin(theme))};
  overflow: initial;

  & .MuiDrawer-paper {
    position: fixed;
    overflow: initial;
    padding-top: ${({ theme }) => theme.spacing(100)};
    ${({ theme, open }) => (open ? openedSidebarMixin(theme) : closedSidebarMixin(theme))};
    background-color: ${({ theme }) => theme.palette.success.dark};
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

export const ExpandButton = styled(Button)`
  position: absolute;
  top: 20%;
  right: -1.5rem;

  svg {
    color: ${({ theme }) => theme.palette.common.black};
    width: 1.2rem;
    height: 1.2rem;
  }

  &::after {
    bottom: 2px;
    transform: translate(-50%, 100%);
  }

  &::before {
    bottom: 8px;
    transform: translate(-50%, -50%);
  }
`;

export const NavigationLogoTitle = styled(LogoTitle)`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing(10)}; ;
`;

export const NavigationLogoSubTitle = styled(LogoTitle, { shouldForwardProp: (prop) => prop !== 'isExpanded' })<{
  isExpanded: boolean;
}>`
  width: ${({ isExpanded }) => (isExpanded ? 'auto' : 0)};
  white-space: nowrap;
  font-size: 1.5rem;
  overflow: ${({ isExpanded }) => (isExpanded ? 'visible' : 'hidden')};
  margin-bottom: ${({ theme }) => theme.spacing(50)};
  text-align: center;
  opacity: 0.7;
  transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, overflow 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export const NavigationLogoIconSmall = styled(LogoIcon)`
  width: 2rem;
  height: 2rem;
`;

export const NavigationLogoIconBig = styled(LogoIcon)`
  width: 3.5rem;
  height: 3.5rem;
`;

export const ListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isExpanded' && prop !== 'isActive',
})<{
  isExpanded: boolean;
  isActive: boolean;
}>`
  justify-content: ${({ isExpanded }) => (isExpanded ? 'flex-start' : 'center')};
  min-width: fit-content;
  background-color: ${({ theme, isActive }) => (isActive ? theme.palette.common.black : 'transparent')};
  padding: ${({ theme }) => `${theme.spacing(12)} ${theme.spacing(16)}`};
  overflow: ${({ isExpanded }) => (isExpanded ? 'visible' : 'hidden')};
  transition: justify-content 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, overflow 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: ${({ theme }) => theme.palette.common.black};
  }

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(16)};
  }
`;

export const ListItemLabel = styled('span', { shouldForwardProp: (prop) => prop !== 'isExpanded' })<{
  isExpanded: boolean;
}>`
  width: ${({ isExpanded }) => (isExpanded ? 'auto' : 0)};
  white-space: nowrap;
  overflow: ${({ isExpanded }) => (isExpanded ? 'visible' : 'hidden')};
  margin-left: ${({ isExpanded }) => (isExpanded ? '1.5rem' : 0)};
  transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, overflow 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    margin-right 220ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export const ProfileIcon = styled(RiUserSettingsLine)`
  ${CommonNavigationMenuIconStyles};
`;

export const ShoppingCartIcon = styled(AiOutlineShoppingCart)`
  ${CommonNavigationMenuIconStyles};
`;
