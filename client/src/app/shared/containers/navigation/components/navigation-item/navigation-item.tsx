import { ReactElement } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { AppRoutes } from '../../../../../app.enums';
import { DropdownMenuConfig } from '../../../header/header.interfaces';
import { ListItem, ListItemLabel } from '../../navigation.styled';

interface NavigationItemProps {
  item: DropdownMenuConfig;
  isExpanded: boolean;
}

const NavigationItem = ({ item, isExpanded }: NavigationItemProps): ReactElement => {
  const location = useLocation();

  const isShoppingListDetailsRoute = matchPath(location.pathname, { path: AppRoutes.ShoppingList })?.isExact as boolean;
  const isShoppingListsRoute = item.url === AppRoutes.ShoppingLists && isShoppingListDetailsRoute;
  const isActiveRoute = location.pathname === item.url || isShoppingListsRoute;

  return (
    <ListItem key={item.id} aria-label='button' isActive={isActiveRoute} isExpanded={isExpanded} onClick={item.onClick}>
      {item.icon}
      <ListItemLabel isExpanded={isExpanded}>{item.label}</ListItemLabel>
    </ListItem>
  );
};

export default NavigationItem;
