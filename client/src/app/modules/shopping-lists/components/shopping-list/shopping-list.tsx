import React from 'react';

import Card from '../../../../shared/components/card/card';
import CardActionsContent from '../../../../shared/components/card/components/card-actions-content/card-actions-content';
import CardDescriptionContent from '../../../../shared/components/card/components/card-description/card-description';

interface ShoppingListProps {
  /**
   * @param {ShoppingList} Defines a specific shopping list item to work with
   * Takes an id of that card as an argument
   * @default undefined
   */
  list?: ShoppingList | null;
  /**
   * @param {HTMLElement | null} Defines (sets) the position of the menucard
   * @default undefined
   * @example <button>Open</button>
   */
  anchorElement?: HTMLElement | null;
  /**
   * @param {boolean} Defines wether menu item (dropdown) is open or not
   * @default undefined
   * @example false/true
   */
  isMenuOpened?: boolean;
  /**
   * @param {void} Defines a click event on menu and dropdown in order to close it
   * @default undefined
   */
  onMenuClose?: () => void;
  /**
   * @param {void} Defines a click event on menu in order to show a dropdown with options
   * Takes and event as an argument to determine current clicked option
   * @default undefined
   */
  onMenuOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * @param {void} Defines a double click event on specific shopping list item card
   * Takes a specific shoppingListId to proceed to shopping list details page
   * @default undefined
   */
  onDoubleClick?: (shoppingListId: string) => void;
}

const ShoppingList = ({
  list,
  anchorElement,
  isMenuOpened,
  onMenuClose,
  onMenuOpen,
  onDoubleClick,
}: ShoppingListProps) => {
  return (
    <Card
      key={list?._id}
      actions={
        <CardActionsContent
          isShoppingList
          anchorElement={anchorElement}
          isMenuOpened={isMenuOpened}
          shoppingListId={list?._id}
          onMenuClose={onMenuClose}
          onMenuOpen={onMenuOpen}
        />
      }
      description={
        <CardDescriptionContent isShoppingList currency={list?.currency} quantity={list?.shoppingListItems.length} />
      }
      shoppingListId={list?._id}
      title={list?.name}
      onDoubleClick={onDoubleClick}
    />
  );
};

export default ShoppingList;
