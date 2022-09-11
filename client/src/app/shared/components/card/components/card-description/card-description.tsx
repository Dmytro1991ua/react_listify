import { ReactElement } from 'react';

import { Currencies } from '../../../../../app.enums';
import { CardDescription, CardDescriptionWrapper } from '../../card.styled';
import { CardDescriptionContentProps } from './card-description.interfaces';

const CardDescriptionContent = ({
  quantity = 0,
  totalPrice = 0,
  price = 0,
  units = 'units',
  currency = Currencies.Dollar,
  isShoppingList,
}: CardDescriptionContentProps): ReactElement => {
  const shoppingListQuantityLabel = quantity === 1 && isShoppingList ? 'product' : 'products';
  const shoppingListDetailsQuantityLabel = units ? units : 'units';
  const generalQuantityLabel = isShoppingList ? shoppingListQuantityLabel : shoppingListDetailsQuantityLabel;
  const isShoppingListTotalPrice = isShoppingList ? totalPrice : price;

  return (
    <CardDescriptionWrapper>
      <CardDescription variant='h5'>
        {quantity}&nbsp;{generalQuantityLabel}
      </CardDescription>
      <CardDescription variant='h5'>
        {isShoppingListTotalPrice}&nbsp;{currency}
      </CardDescription>
    </CardDescriptionWrapper>
  );
};

export default CardDescriptionContent;
