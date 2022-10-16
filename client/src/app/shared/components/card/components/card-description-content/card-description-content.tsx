import { Tooltip } from '@mui/material';
import { ReactElement } from 'react';

import { Currencies } from '../../../../../app.enums';
import { CardDescription, CardDescriptionWrapper } from '../../card.styled';
import { CardDescriptionContentProps } from './card-description-content.interface';

const CardDescriptionContent = ({
  quantity = 0,
  totalPrice = 0,
  price = 0,
  units = 'units',
  currency = Currencies.Dollar,
  isShoppingList,
  toBuyLabel = 0,
  toPurchasedLabel = 0,
}: CardDescriptionContentProps): ReactElement => {
  const shoppingListDetailsQuantityLabel = units ? units : 'units';
  const isShoppingListTotalPrice = isShoppingList ? totalPrice : price;

  const tooltipTitle = `To Buy: ${toBuyLabel} / Purchased: ${toPurchasedLabel}`;

  const renderTooltipContent = (
    <>
      {isShoppingList ? (
        <Tooltip arrow enterDelay={500} leaveDelay={200} title={tooltipTitle}>
          <span data-testid='product-quantity'>
            {toBuyLabel}/{toPurchasedLabel}&nbsp;products
          </span>
        </Tooltip>
      ) : (
        <span data-testid='unit-quantity'>
          {quantity}&nbsp;{shoppingListDetailsQuantityLabel}
        </span>
      )}
    </>
  );

  return (
    <CardDescriptionWrapper>
      <CardDescription variant='h5'>
        <Tooltip arrow enterDelay={500} leaveDelay={200} title='Test'>
          {renderTooltipContent}
        </Tooltip>
      </CardDescription>
      <CardDescription variant='h5'>
        {isShoppingListTotalPrice}&nbsp;{currency}
      </CardDescription>
    </CardDescriptionWrapper>
  );
};

export default CardDescriptionContent;
