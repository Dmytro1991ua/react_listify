import { ReactElement } from 'react';

import { ProductItemProps } from './product-item.interfaces';
import Card from '../../../../shared/components/card/card';
import CardActionsContent from '../../../../shared/components/card/components/card-actions-content/card-actions-content';
import CardDescriptionContent from '../../../../shared/components/card/components/card-description-content/card-description-content';
import { calculateByQuantity } from '../../../../utils';

const ProductItem = ({
  item,
  currency,
  calculateTotalPriceByQuantity,
  isShoppingList,
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
          isShoppingList={isShoppingList}
          shoppingListId={item?._id}
          onDelete={onDelete}
          onEditProductItem={onEdit}
        />
      }
      description={
        <CardDescriptionContent
          currency={currency}
          isShoppingList={isShoppingList}
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
