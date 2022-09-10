import { ReactElement } from 'react';

import { ShoppingListData, ShoppingListItem } from '../../../../app.interfaces';
import Card from '../../../../shared/components/card/card';
import CardActionsContent from '../../../../shared/components/card/components/card-actions-content/card-actions-content';
import CardDescriptionContent from '../../../../shared/components/card/components/card-description/card-description';

interface ProductItemProps {
  /**
   * @param {Partial<ShoppingListData & ShoppingListItem>} Defines a specific shopping list or shopping list item
   */
  item: Partial<ShoppingListData & ShoppingListItem>;
  /**
   * @param {string} name The name of the item a specific shopping list or shopping list item
   * @default Currencies.Dollar
   * @example Currencies.Dollar, Currencies.Euro
   */
  currency: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onClick: (id: string) => Promise<void>;
}

const ProductItem = ({ item, currency, onDelete, onEdit, onClick }: ProductItemProps): ReactElement => {
  return (
    <Card
      key={item?._id}
      actions={
        <CardActionsContent
          isSelected={item.isChecked}
          isShoppingList={false}
          shoppingListId={item?._id}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      }
      description={<CardDescriptionContent currency={currency} isShoppingList={false} quantity={item?.quantity} />}
      isSelected={item.isChecked}
      productItemId={item._id}
      title={item?.name}
      onClick={onClick}
    />
  );
};

export default ProductItem;
