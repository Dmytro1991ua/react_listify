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
  isSelected,
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

  function handleProductItemEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.stopPropagation();
    onEdit && onEdit(shoppingListId as string);
  }

  function handleProductItemDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    onDelete && onDelete(shoppingListId as string);
  }

  const shoppingListActions = (
    <>
      <CardActionButton aria-label='menu-btn' onClick={handleOpenListIconClick}>
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
      {!isSelected && (
        <CardActionButton aria-label='edit-btn' onClick={handleProductItemEdit}>
          <EditIcon />
        </CardActionButton>
      )}
      <CardActionButton aria-label='delete-btn' onClick={handleProductItemDelete}>
        <DeleteIcon />
      </CardActionButton>
    </>
  );

  return <CardActions>{isShoppingList ? shoppingListActions : shoppingListDetailsActions}</CardActions>;
};

export default CardActionsContent;
