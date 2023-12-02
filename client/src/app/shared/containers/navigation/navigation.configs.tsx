import { v4 as uuidv4 } from 'uuid';

import { ProfileIcon, ShoppingCartIcon } from './navigation.styled';
import { AppRoutes } from '../../../app.enums';
import history from '../../../services/history.service';
import { DropdownMenuConfig } from '../header/header.interfaces';

export const NAVIGATION_MENU_CONFIGS: DropdownMenuConfig[] = [
  {
    id: uuidv4(),
    label: 'Shopping Lists',
    url: AppRoutes.ShoppingLists,
    icon: <ShoppingCartIcon />,
    onClick: () => {
      history.push(AppRoutes.ShoppingLists);
    },
  },
  {
    id: uuidv4(),
    label: 'Profile',
    url: AppRoutes.Profile,
    icon: <ProfileIcon />,
    onClick: () => {
      history.push(AppRoutes.Profile);
    },
  },
];
