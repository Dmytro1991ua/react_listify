import { ReactElement } from 'react';

import { ShoppingListData, ShoppingListItem } from '../../../../app.interfaces';
import Card from '../../../../shared/components/card/card';
import CardActionsContent from '../../../../shared/components/card/components/card-actions-content/card-actions-content';
import CardDescriptionContent from '../../../../shared/components/card/components/card-description/card-description';

interface ProductItemProps {
  item: Partial<ShoppingListData & ShoppingListItem>;
  currency: string;
  onDelete: (id: string) => void;
  onClick: (id: string) => Promise<void>;
}

const ProductItem = ({ item, currency, onDelete, onClick }: ProductItemProps): ReactElement => {
  return (
    <Card
      key={item?._id}
      actions={<CardActionsContent isShoppingList={false} shoppingListId={item?._id} onDelete={onDelete} />}
      description={<CardDescriptionContent currency={currency} isShoppingList={false} quantity={item?.quantity} />}
      productItemId={item._id}
      title={item?.name}
      onClick={onClick}
    />
  );
};

export default ProductItem;
