import { CardHeader } from '@mui/material';
import { ReactElement } from 'react';

import Checkbox from '../checkbox/checkbox';
import { CardProps } from './card.interfaces';
import { CardTitle, CustomCard } from './card.styled';

const Card = ({
  title,
  description,
  actions,
  productItemId,
  shoppingListId,
  isSelected,
  onClick,
  onDoubleClick,
}: CardProps): ReactElement => {
  const cartTitle = (
    <>
      {onClick && <Checkbox checked={isSelected} customSize='3rem' />}
      <CardTitle isProductItem={Boolean(onClick)} isSelected={isSelected} variant='h4'>
        {title}
      </CardTitle>
    </>
  );

  return (
    <CustomCard
      isSelected={isSelected}
      onClick={() => onClick && onClick(productItemId as string)}
      onDoubleClick={() => onDoubleClick && onDoubleClick(shoppingListId as string)}
    >
      <CardHeader disableTypography action={actions} component='header' subheader={description} title={cartTitle} />
    </CustomCard>
  );
};

export default Card;
