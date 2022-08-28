import { MenuItem } from '@mui/material';
import React, { ReactElement } from 'react';

import { dropdownConfigs } from '../../../../../modules/shopping-lists/shopping-lists.configs';
import { DropdownMenu } from '../../../../containers/header/header.styled';
import { CardActionButton, CardActions, DeleteIcon, EditIcon, OpenIcon } from '../../card.styled';
import { CardActionsContentProps } from './card-actions-content.interfaces';

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
  onRedirectToDetails,
  onSetShoppingListId,
}: CardActionsContentProps): ReactElement => {
  const SHOPPING_LIST_DROPDOWN_MENU_CONFIGS = dropdownConfigs(onRedirectToDetails, onModalOpen);

  function handleOpenListIconClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    onMenuOpen && onMenuOpen(e);
    onSetShoppingListId && onSetShoppingListId(shoppingListId as string);
  }

  const shoppingListActions = (
    <>
      <CardActionButton onClick={handleOpenListIconClick}>
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
