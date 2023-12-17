import { CardHeader } from '@mui/material';
import { ReactElement } from 'react';

import { CardProps } from './card.interfaces';
import { CardTitle, CustomCard } from './card.styled';
import Checkbox from '../checkbox/checkbox';

const Card = ({
  title,
  description,
  actions,
  productItemId,
  shoppingListId,
  isSelected,
  isFavorite,
  onClick,
  onDoubleClick,
}: CardProps): ReactElement => {
  function handleProductItemClick(): void {
    onClick && onClick(productItemId as string);
  }

  function handleShoppingListDoubleClick(): void {
    !isSelected && onDoubleClick && onDoubleClick(shoppingListId as string);
  }

  const cardTitle = (
    <>
      {onClick && <Checkbox checked={isSelected} customSize='3rem' />}
      <CardTitle isProductItem={Boolean(onClick)} isSelected={isSelected} variant='h4'>
        {title}
      </CardTitle>
    </>
  );

  return (
    <CustomCard
      data-testid='card'
      isFavorite={isFavorite}
      isSelected={isSelected}
      onClick={handleProductItemClick}
      onDoubleClick={handleShoppingListDoubleClick}>
      <CardHeader disableTypography action={actions} component='header' subheader={description} title={cardTitle} />
    </CustomCard>
  );
};

export default Card;
