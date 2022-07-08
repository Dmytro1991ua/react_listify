import { v4 as uuidv4 } from 'uuid';

import { AppRoutes } from '../../../app.enums';
import history from '../../../services/history.service';
import { toastService } from '../../../services/toast.service';
import { DropdownMenuConfigs } from './header.interfaces';
import { LogoutIcon, ProfileIcon } from './header.styled';

export const DROPDOWN_MENU_CONFIGS: DropdownMenuConfigs[] = [
  {
    id: uuidv4(),
    title: 'Profile',
    icon: <ProfileIcon />,
    onClick: () => {
      history.push(AppRoutes.Profile);
    },
  },
  {
    id: uuidv4(),
    title: 'Logout',
    icon: <LogoutIcon />,
    onClick: () => {
      toastService.info('Not Implemented yet');
    },
  },
];
