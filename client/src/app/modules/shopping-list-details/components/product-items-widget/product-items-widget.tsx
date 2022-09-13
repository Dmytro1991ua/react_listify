import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';

import { Currencies } from '../../../../app.enums';
import { Widget, WidgetContentWrapper } from './product-items-widget.styled';

interface ProductItemsWidgetProps {
  currency: Currencies;
}

const ProductItemsWidget = ({ currency }: ProductItemsWidgetProps): ReactElement => {
  function commonLayout(label: string): JSX.Element {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ margin: 0 }} variant='h4'>
          {label}:&nbsp;
        </Typography>
        <Typography sx={{ margin: 0 }} variant='h4'>
          {currency}
        </Typography>
      </Box>
    );
  }

  const toBuy = commonLayout('To Buy');
  const purchased = commonLayout('Purchased');

  const widgetContent = (
    <WidgetContentWrapper>
      {toBuy}
      {purchased}
    </WidgetContentWrapper>
  );

  return <Widget>{widgetContent}</Widget>;
};

export default ProductItemsWidget;
