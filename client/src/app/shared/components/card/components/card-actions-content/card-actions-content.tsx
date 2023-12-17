import { MenuItem } from '@mui/material';
import React, { ReactElement } from 'react';

import { CardActionsContentProps } from './card-actions-content.interfaces';
import { dropdownConfigs } from '../../../../../modules/shopping-lists/shopping-lists.configs';
import { DropdownMenu } from '../../../../containers/header/header.styled';
import {
  AddToFavorite,
  CardActionButton,
  CardActions,
  DeleteIcon,
  EditIcon,
  OpenIcon,
  RemoveFromFavorite,
} from '../../card.styled';

const CardActionsContent = ({
  anchorElement,
  isMenuOpened,
  isShoppingList,
  shoppingListId,
  isSelected,
  isFavorite,
  onMenuOpen,
  onMenuClose,
  onEditProductItem,
  onEditShoppingList,
  onDelete,
  onModalOpen,
  onRedirectToDetails,
  onSetShoppingListId,
  onAddToFavorites,
}: CardActionsContentProps): ReactElement => {
  const SHOPPING_LIST_DROPDOWN_MENU_CONFIGS = dropdownConfigs(onRedirectToDetails, onModalOpen);

  function handleOpenListIconClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.stopPropagation();

    onMenuOpen && onMenuOpen(e);
    onSetShoppingListId && onSetShoppingListId(shoppingListId as string);
  }

  function handleShoppingListEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.stopPropagation();

    onSetShoppingListId && onSetShoppingListId(shoppingListId as string);
    onEditShoppingList && onEditShoppingList(shoppingListId as string);
  }

  function handleProductItemEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.stopPropagation();
    onEditProductItem && onEditProductItem(shoppingListId as string);
  }

  function handleProductItemDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    onDelete && onDelete(shoppingListId as string);
  }

  async function handleAddShoppingListToFavorites(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    onAddToFavorites && (await onAddToFavorites(shoppingListId as string));
  }

  const renderActionButton = (
    label: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    icon: JSX.Element
  ) =>
    !isSelected && (
      <CardActionButton aria-label={label} onClick={onClick}>
        {icon}
      </CardActionButton>
    );

  const renderDropdownMenuItems = () =>
    SHOPPING_LIST_DROPDOWN_MENU_CONFIGS.map((item) => (
      <MenuItem
        key={item.id}
        onClick={(e) => {
          e.stopPropagation();

          item.onClick();
          onMenuClose && onMenuClose();
        }}>
        {item.icon} {item.label}
      </MenuItem>
    ));

  const shoppingListActions = (
    <>
      {renderActionButton('edit-shopping-list-btn', handleShoppingListEdit, <EditIcon />)}
      {renderActionButton('menu-btn', handleOpenListIconClick, <OpenIcon />)}
      {renderActionButton(
        'favorites-icon',
        handleAddShoppingListToFavorites,
        isFavorite ? <RemoveFromFavorite /> : <AddToFavorite />
      )}

      <DropdownMenu
        anchorEl={anchorElement}
        open={isMenuOpened as boolean}
        sx={{ marginTop: '1rem' }}
        onClose={(e: MouseEvent) => {
          e.stopPropagation();

          onMenuClose && onMenuClose();
        }}>
        {renderDropdownMenuItems()}
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
