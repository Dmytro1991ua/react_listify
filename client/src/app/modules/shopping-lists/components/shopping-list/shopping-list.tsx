import { useMemo } from 'react';

import Card from '../../../../shared/components/card/card';
import CardActionsContent from '../../../../shared/components/card/components/card-actions-content/card-actions-content';
import CardDescriptionContent from '../../../../shared/components/card/components/card-description-content/card-description-content';
import { calculateTotalPrice, toBuyOrPurchasedLabel } from '../../../../utils';
import { ShoppingListProps } from './shopping-list.interfaces';

const ShoppingList = ({
  list,
  anchorElement,
  isMenuOpened,
  calculateTotalPriceByQuantity,
  isShoppingList,
  onMenuClose,
  onMenuOpen,
  onDoubleClick,
  onModalOpen,
  onSetShoppingListId,
  onRedirectToDetails,
  onEditShoppingList,
  onAddToFavorites,
}: ShoppingListProps) => {
  const toBuyLabel = useMemo(() => {
    return toBuyOrPurchasedLabel(list?.shoppingListItems ?? [], false);
  }, [list]);

  const purchasedLabel = useMemo(() => {
    return toBuyOrPurchasedLabel(list?.shoppingListItems ?? [], true);
  }, [list]);

  return (
    <Card
      key={list?._id}
      actions={
        <CardActionsContent
          anchorElement={anchorElement}
          isFavorite={list?.isFavorite}
          isMenuOpened={isMenuOpened}
          isShoppingList={isShoppingList}
          shoppingListId={list?._id}
          onAddToFavorites={onAddToFavorites}
          onEditShoppingList={onEditShoppingList}
          onMenuClose={onMenuClose}
          onMenuOpen={onMenuOpen}
          onModalOpen={onModalOpen}
          onRedirectToDetails={onRedirectToDetails}
          onSetShoppingListId={onSetShoppingListId}
        />
      }
      description={
        <CardDescriptionContent
          currency={list?.currency}
          isShoppingList={isShoppingList}
          quantity={list?.shoppingListItems?.length}
          toBuyLabel={toBuyLabel}
          toPurchasedLabel={purchasedLabel}
          totalPrice={calculateTotalPrice(list?.shoppingListItems ?? [], calculateTotalPriceByQuantity as boolean)}
        />
      }
      isFavorite={list?.isFavorite}
      shoppingListId={list?._id}
      title={list?.name}
      onDoubleClick={onDoubleClick}
    />
  );
};

export default ShoppingList;
