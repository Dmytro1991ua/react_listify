import { Box } from '@mui/material';
import { ReactElement } from 'react';

import { Title, Widget, WidgetContentWrapper } from './product-items-widget.styled';
import { Currencies } from '../../../../app.enums';
import { ShoppingListItem } from '../../../../app.interfaces';
import { calculateProductItemsByCheckedSate } from '../../../../utils';
import { useAuthStore } from '../../../auth/auth.store';

interface ProductItemsWidgetProps {
  currency: Currencies;
  shoppingListItems: ShoppingListItem[];
}

const ProductItemsWidget = ({ currency, shoppingListItems }: ProductItemsWidgetProps): ReactElement => {
  const user = useAuthStore((state) => state.user);

  const calculatedToBuy = calculateProductItemsByCheckedSate(
    shoppingListItems,
    false,
    user?.calculateByQuantity as boolean
  );
  const calculatedPurchased = calculateProductItemsByCheckedSate(
    shoppingListItems,
    true,
    user?.calculateByQuantity as boolean
  );

  function commonLayout(label: string, price: number): JSX.Element {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Title variant='h4'>{label}:&nbsp;</Title>
        <Title variant='h4'>
          {price ?? 0} {currency}
        </Title>
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
