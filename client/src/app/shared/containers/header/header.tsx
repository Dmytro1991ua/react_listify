import { Box, MenuItem, Toolbar } from '@mui/material';
import { ReactElement, useState } from 'react';

import DefaultUser from '../../../../assets/images/auth/user.png';
import { AppRoutes } from '../../../app.enums';
import history from '../../../services/history.service';
import { DROPDOWN_MENU_CONFIGS } from './header.configs';
import { DropdownMenu, HeaderWrapper, Logo, LogoIcon, LogoTitle, ProfileImage } from './header.styled';

const Header = (): ReactElement => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const isMenuOpened = Boolean(anchorElement);

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorElement(event.currentTarget);
  }

  function handleMenuClose(): void {
    setAnchorElement(null);
  }

  function handleProfilePageRedirect(): void {
    history.push(AppRoutes.Profile);
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
            <ProfileImage alt='user' src={DefaultUser} />
          </button>
          <DropdownMenu anchorEl={anchorElement} open={isMenuOpened} onClose={handleMenuClose}>
            {DROPDOWN_MENU_CONFIGS.map((item) => (
              <MenuItem key={item.id} onClick={item.onClick}>
                {item.icon} {item.title}
              </MenuItem>
            ))}
          </DropdownMenu>
        </Box>
      </Toolbar>
    </HeaderWrapper>
  );
};

export default Header;
