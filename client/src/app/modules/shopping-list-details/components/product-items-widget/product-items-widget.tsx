import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';

import { Currencies } from '../../../../app.enums';
import { ShoppingListItem } from '../../../../app.interfaces';
import { calculateProductItemsByCheckedSate } from '../../../../utils';
import { useAuthStore } from '../../../auth/auth.store';
import { Widget, WidgetContentWrapper } from './product-items-widget.styled';

interface ProductItemsWidgetProps {
  currency: Currencies;
  shoppingListItems: ShoppingListItem[];
}

const ProductItemsWidget = ({ currency, shoppingListItems }: ProductItemsWidgetProps): ReactElement => {
  const user = useAuthStore((state) => state.user);

  const calculatedToBuy = calculateProductItemsByCheckedSate(
    shoppingListItems,
    false,
    user?.calculateByQuantity ?? false
  );
  const calculatedPurchased = calculateProductItemsByCheckedSate(
    shoppingListItems,
    true,
    user?.calculateByQuantity ?? false
  );

  function commonLayout(label: string, price: number): JSX.Element {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ margin: 0 }} variant='h4'>
          {label}:&nbsp;
        </Typography>
        <Typography sx={{ margin: 0 }} variant='h4'>
          {price ?? 0} {currency}
        </Typography>
      </Box>
    );
  }

  const toBuyLayout = commonLayout('To Buy', calculatedToBuy);
  const purchasedLayout = commonLayout('Purchased', calculatedPurchased);

  const widgetContent = (
    <WidgetContentWrapper>
      {toBuyLayout}
      {purchasedLayout}
    </WidgetContentWrapper>
  );

  return <Widget>{widgetContent}</Widget>;
};

export default ProductItemsWidget;
