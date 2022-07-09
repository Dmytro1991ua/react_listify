import { Box, MenuItem, Toolbar } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DefaultUser from '../../../../assets/images/auth/user.png';
import { AppRoutes } from '../../../app.enums';
import { DROPDOWN_MENU_CONFIGS } from './header.configs';
import { DropdownMenu, HeaderWrapper, Logo, LogoIcon, LogoTitle, ProfileImage } from './header.styled';

const Header = (): ReactElement => {
  const location = useLocation();

  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const isMenuOpened = Boolean(anchorElement);
  const isProfileRoute = location.pathname === AppRoutes.Profile;

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorElement(event.currentTarget);
  }

  function handleMenuClose(): void {
    setAnchorElement(null);
  }

  return (
    <HeaderWrapper elevation={0} variant='outlined'>
      <Toolbar>
        <Logo to={AppRoutes.ShoppingLists}>
          <LogoTitle variant='h3'>Listify</LogoTitle>
          <LogoIcon />
        </Logo>
        <Box sx={{ marginLeft: 'auto' }}>
          <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={handleMenuOpen}>
            <ProfileImage alt='user' isActive={isProfileRoute} src={DefaultUser} />
          </button>
          <DropdownMenu anchorEl={anchorElement} open={isMenuOpened} onClose={handleMenuClose}>
            {DROPDOWN_MENU_CONFIGS.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => {
                  item.onClick();
                  handleMenuClose();
                }}
              >
                {item.icon} {item.label}
              </MenuItem>
            ))}
          </DropdownMenu>
        </Box>
      </Toolbar>
    </HeaderWrapper>
  );
};

export default Header;
