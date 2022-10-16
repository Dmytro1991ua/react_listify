import { useMemo } from 'react';

import { ShoppingListData } from '../../../../app.interfaces';
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
  onMenuClose,
  onMenuOpen,
  onDoubleClick,
  onModalOpen,
  onSetShoppingListId,
  onRedirectToDetails,
}: ShoppingListProps) => {
  const toBuyLabel = useMemo(() => {
    return toBuyOrPurchasedLabel(list as ShoppingListData, false);
  }, [list]);

  const purchasedLabel = useMemo(() => {
    return toBuyOrPurchasedLabel(list as ShoppingListData, true);
  }, [list]);

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
          onModalOpen={onModalOpen}
          onRedirectToDetails={onRedirectToDetails}
          onSetShoppingListId={onSetShoppingListId}
        />
      }
      description={
        <CardDescriptionContent
          isShoppingList
          currency={list?.currency}
          quantity={list?.shoppingListItems?.length}
          toBuyLabel={toBuyLabel}
          toPurchasedLabel={purchasedLabel}
          totalPrice={calculateTotalPrice(list?.shoppingListItems ?? [], calculateTotalPriceByQuantity as boolean)}
        />
      }
      shoppingListId={list?._id}
      title={list?.name}
      onDoubleClick={onDoubleClick}
    />
  );
};

export default ShoppingList;
