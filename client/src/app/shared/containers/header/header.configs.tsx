import { v4 as uuidv4 } from 'uuid';

import { AppRoutes } from '../../../app.enums';
import { authService } from '../../../modules/auth/auth.service';
import history from '../../../services/history.service';
import { DropdownMenuConfig } from './header.interfaces';
import { LogoutIcon, ProfileIcon } from './header.styled';

export const DROPDOWN_MENU_CONFIGS: DropdownMenuConfig[] = [
  {
    id: uuidv4(),
    label: 'Profile',
    url: AppRoutes.Profile,
    icon: <ProfileIcon />,
    onClick: () => {
      history.push(AppRoutes.Profile);
    },
  },
  {
    id: uuidv4(),
    label: 'Logout',
    icon: <LogoutIcon />,
    onClick: async () => {
      await authService.signOut();
    },
  },
];
