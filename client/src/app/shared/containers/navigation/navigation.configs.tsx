import { v4 as uuidv4 } from 'uuid';

import { AppRoutes } from '../../../app.enums';
import history from '../../../services/history.service';
import { DropdownMenuConfig } from '../header/header.interfaces';
import { ProfileIcon, ShoppingCartIcon } from './navigation.styled';

export const NAVIGATION_MENU_CONFIGS: DropdownMenuConfig[] = [
  {
    id: uuidv4(),
    label: 'Shopping List',
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
