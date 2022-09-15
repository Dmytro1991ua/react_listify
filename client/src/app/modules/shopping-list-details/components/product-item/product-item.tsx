import { ReactElement } from 'react';

import Card from '../../../../shared/components/card/card';
import CardActionsContent from '../../../../shared/components/card/components/card-actions-content/card-actions-content';
import CardDescriptionContent from '../../../../shared/components/card/components/card-description/card-description';
import { calculateByQuantity } from '../../../../utils';
import { ProductItemProps } from './product-item.interfaces';

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
