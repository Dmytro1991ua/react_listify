import { MenuItem } from '@mui/material';
import React, { ReactElement, useMemo } from 'react';

import { dropdownConfigs } from '../../../../../modules/shopping-lists/shopping-lists.configs';
import { DropdownMenu } from '../../../../containers/header/header.styled';
import { CardActionButton, CardActions, DeleteIcon, EditIcon, OpenIcon } from '../../card.styled';

interface CardActionsContentProps {
  /**
   * @param {HTMLElement | null} Defines (sets) the position of the menu card
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
   * @param {boolean} Defines if we currently work with shopping list card in order to show a specific data related to this card
   * Establish difference between shopping list and shopping list details cards
   * @default undefined
   * @example true/false
   */
  isShoppingList?: boolean;
  /**
   * @param {string} Defines a specific shopping list id
   * @default undefined
   * @example 52c7c0ce-f5ef-47bc-b33d-687452e39fce
   */
  shoppingListId?: string;
  /**
   * @param {void} Defines a click event on menu in order to show a dropdown with options
   * Takes and event as an argument to determine current clicked option
   * @default undefined
   */
  onMenuOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * @param {void} Defines a click event on menu and dropdown in order to close it
   * @default undefined
   */
  onMenuClose?: () => void;
  /**
   * @param {void} Defines a click event on Edit button within specific shopping list details card
   * Takes an id of that card as an argument
   * @default undefined
   */
  onEdit?: (id: string) => void;
  /**
   * @param {void} Defines a click event on Delete button within specific shopping list details card
   * Takes an id of that card as an argument
   * @default undefined
   */
  onDelete?: (id: string) => void | Promise<void>;
  /**
   * @param {void} Defines a click event on delete btn in dropdown menu within specific shopping list
   * @default undefined
   */
  onModalOpen?: (id: string) => void | Promise<void>;
}

const CardActionsContent = ({
  anchorElement,
  isMenuOpened,
  isShoppingList,
  shoppingListId,
  onMenuOpen,
  onMenuClose,
  onEdit,
  onDelete,
  onModalOpen,
}: CardActionsContentProps): ReactElement => {
  const SHOPPING_LIST_DROPDOWN_MENU_CONFIGS = useMemo(
    () => dropdownConfigs(shoppingListId as string, onModalOpen),
    [shoppingListId, onModalOpen]
  );

  const shoppingListActions = (
    <>
      <CardActionButton onClick={onMenuOpen}>
        <OpenIcon />
      </CardActionButton>

      <DropdownMenu
        anchorEl={anchorElement}
        open={isMenuOpened as boolean}
        sx={{ marginTop: '1rem' }}
        onClose={onMenuClose}
      >
        {SHOPPING_LIST_DROPDOWN_MENU_CONFIGS.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              item.onClick();
              onMenuClose && onMenuClose();
            }}
          >
            {item.icon} {item.label}
          </MenuItem>
        ))}
      </DropdownMenu>
    </>
  );

  const shoppingListDetailsActions = (
    <>
      <CardActionButton onClick={() => onEdit && onEdit(shoppingListId as string)}>
        <EditIcon />
      </CardActionButton>
      <CardActionButton onClick={() => onDelete && onDelete(shoppingListId as string)}>
        <DeleteIcon />
      </CardActionButton>
    </>
  );

  return <CardActions>{isShoppingList ? shoppingListActions : shoppingListDetailsActions}</CardActions>;
};

export default CardActionsContent;
