import { Box, MenuItem, Toolbar } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AppRoutes, UserImageSize } from '../../../app.enums';
import { useAuthStore } from '../../../modules/auth/auth.store';
import FallbackImage from '../../components/fallback-image/fallback-image';
import { DROPDOWN_MENU_CONFIGS } from './header.configs';
import { DropdownMenu, HeaderWrapper, Logo, LogoIcon, LogoTitle } from './header.styled';

const Header = (): ReactElement => {
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const isUserAuthenticated = Boolean(user);

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
            <FallbackImage
              altText="User's profile photo"
              imageUrl={user?.photoURL as string}
              isActive={isProfileRoute}
              isUserAuthenticated={Boolean(isUserAuthenticated)}
              size={UserImageSize.Small}
            />
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
