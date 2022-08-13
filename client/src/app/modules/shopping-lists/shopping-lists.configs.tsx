import { v4 as uuidv4 } from 'uuid';

import { AppRoutes } from '../../app.enums';
import history from '../../services/history.service';
import { DropdownMenuConfig } from '../../shared/containers/header/header.interfaces';
import { OpenIcon, TrashIcon } from '../../shared/containers/header/header.styled';
import { toastService } from './../../services/toast.service';

export function dropdownConfigs(shoppingListId: string): DropdownMenuConfig[] {
  return [
    {
      id: uuidv4(),
      label: 'Open',
      url: AppRoutes.ShoppingList,
      icon: <OpenIcon />,
      onClick: () => {
        history.push(`${AppRoutes.ShoppingLists}/${shoppingListId}`);
      },
    },
    {
      id: uuidv4(),
      label: 'Delete',
      icon: <TrashIcon />,
      onClick: () => {
        toastService.info('Not implemented yet');
      },
    },
  ];
}
