import { v4 as uuidv4 } from 'uuid';

import { AppRoutes } from '../../app.enums';
import { DropdownMenuConfig } from '../../shared/containers/header/header.interfaces';
import { OpenIcon, TrashIcon } from '../../shared/containers/header/header.styled';

export function dropdownConfigs(onRedirectToDetails?: () => void, onModalOpen?: () => void): DropdownMenuConfig[] {
  return [
    {
      id: uuidv4(),
      label: 'Open',
      url: AppRoutes.ShoppingList,
      icon: <OpenIcon />,
      onClick: () => {
        onRedirectToDetails && onRedirectToDetails();
      },
    },
    {
      id: uuidv4(),
      label: 'Delete',
      icon: <TrashIcon />,
      onClick: () => {
        onModalOpen && onModalOpen();
      },
    },
  ];
}
