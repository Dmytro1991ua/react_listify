import { Box, MenuItem, Toolbar } from '@mui/material';
import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import { DROPDOWN_MENU_CONFIGS } from './header.configs';
import { DropdownMenu, HeaderWrapper, Logo, LogoIcon, LogoTitle } from './header.styled';
import { AppRoutes, UserImageSize } from '../../../app.enums';
import { useDropdownMenu } from '../../../cdk/hooks/useDropdownMenu';
import { useAuthStore } from '../../../modules/auth/auth.store';
import FallbackImage from '../../components/fallback-image/fallback-image';

const Header = (): ReactElement => {
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const isUserAuthenticated = Boolean(user);

  const { anchorElement, isDropdownMenuOpened, onDropdownMenuClose, onDropdownMenuOpen } = useDropdownMenu();

  const isProfileRoute = location.pathname === AppRoutes.Profile;

  return (
    <HeaderWrapper elevation={0} variant='outlined'>
      <Toolbar>
        <Logo data-testid='logo' to={AppRoutes.ShoppingLists}>
          <LogoTitle variant='h3'>Listify</LogoTitle>
          <LogoIcon />
        </Logo>
        <Box sx={{ marginLeft: 'auto' }}>
          <button
            data-testid='menu-btn'
            style={{ backgroundColor: 'transparent', border: 'none' }}
            onClick={onDropdownMenuOpen}
          >
            <FallbackImage
              altText="User's profile photo"
              imageUrl={user?.photoURL as string}
              isActive={isProfileRoute}
              isUserAuthenticated={Boolean(isUserAuthenticated)}
              size={UserImageSize.Small}
            />
          </button>
          <DropdownMenu anchorEl={anchorElement} open={isDropdownMenuOpened} onClose={onDropdownMenuClose}>
            {DROPDOWN_MENU_CONFIGS.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => {
                  item.onClick();
                  onDropdownMenuClose();
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
