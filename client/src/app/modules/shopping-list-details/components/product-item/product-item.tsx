import { ReactElement } from 'react';

import { ShoppingListData, ShoppingListItem } from '../../../../app.interfaces';
import Card from '../../../../shared/components/card/card';
import CardActionsContent from '../../../../shared/components/card/components/card-actions-content/card-actions-content';
import CardDescriptionContent from '../../../../shared/components/card/components/card-description/card-description';
import { calculateByQuantity } from '../../../../utils';

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
  /**
   * @param {boolean} Defines if calculateByQuantity property true of false in specific user (allows to calculate a product item price and total price of specific shopping list item)
   * @default false
   * @example false/true
   */
  calculateTotalPriceByQuantity?: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onClick: (id: string) => Promise<void>;
}

const ProductItem = ({
  item,
  currency,
  calculateTotalPriceByQuantity,
  onDelete,
  onEdit,
  onClick,
}: ProductItemProps): ReactElement => {
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
      description={
        <CardDescriptionContent
          currency={currency}
          isShoppingList={false}
          price={calculateByQuantity(
            item?.price as number,
            item?.quantity as number,
            calculateTotalPriceByQuantity as boolean
          )}
          quantity={item?.quantity}
          units={item?.units}
        />
      }
      isSelected={item.isChecked}
      productItemId={item._id}
      title={item?.name}
      onClick={onClick}
    />
  );
};

export default ProductItem;
