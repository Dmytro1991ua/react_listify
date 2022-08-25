import { ReactElement } from 'react';

import Card from '../../../shared/components/card/card';
import CardActionsContent from '../../../shared/components/card/components/card-actions-content/card-actions-content';
import CardDescriptionContent from '../../../shared/components/card/components/card-description/card-description';

interface ProductItemProps {
  item: ShoppingListItem;
  currency: string;
  onDelete: (id: string) => void;
}

const ProductItem = ({ item, currency, onDelete }: ProductItemProps): ReactElement => {
  return (
    <Card
      key={item?._id}
      actions={<CardActionsContent isShoppingList={false} shoppingListId={item?._id} onDelete={onDelete} />}
      description={<CardDescriptionContent currency={currency} isShoppingList={false} quantity={item?.quantity} />}
      title={item?.name}
    />
  );
};

export default ProductItem;
