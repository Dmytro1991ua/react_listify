import { ReactElement, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AppRoutes } from '../../app.enums';
import history from '../../services/history.service';
import SectionHeader from '../../shared/components/section-header/section-header';
import { toastService } from './../../services/toast.service';
import ShoppingList from './components/shopping-list/shopping-list';

//TODO: Delete when the real data from server will be available
const MOCK_SHOPPING_LISTS: ShoppingList[] = [
  { id: uuidv4(), name: 'First Test List', currency: '$', shoppingListItems: [] },
  {
    id: uuidv4(),
    name: 'Second Test List',
    currency: '€',
    shoppingListItems: [
      {
        id: uuidv4(),
        name: 'Terra',
        category: { id: uuidv4(), iconName: 'Icon', isCustom: false, label: 'Cool Icon', value: 'Cool Icon' },
        quantity: 10,
        units: 'L',
        price: 10,
        isChecked: false,
      },
    ],
  },
];

const ShoppingLists = (): ReactElement => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const isMenuOpened = Boolean(anchorElement);

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorElement(event.currentTarget);
  }

  function handleMenuClose(): void {
    setAnchorElement(null);
  }

  function handleAddNewShoppingList(): void {
    toastService.info('Not implemented yet');
  }

  function handleCardDoubleClick(shoppingListId: string): void {
    history.push(`${AppRoutes.ShoppingLists}/${shoppingListId}`);
  }

  return (
    <>
      <SectionHeader primaryBtnLabel='Add List' title='Shopping List' onClick={handleAddNewShoppingList} />
      {MOCK_SHOPPING_LISTS.map((list) => (
        <ShoppingList
          key={list.id}
          anchorElement={anchorElement}
          isMenuOpened={isMenuOpened}
          list={list}
          onDoubleClick={handleCardDoubleClick}
          onMenuClose={handleMenuClose}
          onMenuOpen={handleMenuOpen}
        />
      ))}
    </>
  );
};

export default ShoppingLists;
