import { CardHeader } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

import { CardTitle, CustomCard } from './card.styled';

interface CardProps {
  /**
   * @param {string} Defines a specific card's title
   * @default undefined
   * @example New Shopping List
   */
  title?: string;
  /**
   * @param {ReactNode} Defines a specific card's description
   * @default undefined
   * @example
   * <>
   *  <span>0 products</span>
   *  <span>0 $</span>
   * </>
   */
  description?: ReactNode;
  /**
   * @param {ReactNode} Defines a specific card's actions
   * @default undefined
   * @example
   * <>
   *  <button>Edit</button>
   *  <button>Delete</button>
   * </>
   */
  actions?: ReactNode;
  /**
   * @param {string} Defines a specific shopping list id
   * @default undefined
   * @example 52c7c0ce-f5ef-47bc-b33d-687452e39fce
   */
  shoppingListId?: string;
  /**
   * @param {string} Defines a specific product item id
   * @default undefined
   * @example 6310fa5023fc4b4f1fb0cd7a
   */
  productItemId?: string;
  /**
   * @param {void} Defines a click event on specific shopping list detail card
   * @default undefined
   */
  /**
   * @param {boolean} Defines if a specific shopping list item was selected
   * @default undefined
   * @example true/false
   */
  isSelected?: boolean;
  onClick?: (id: string) => void | Promise<void>;
  /**
   * @param {void} Defines a double click event on specific shopping list item card
   * Takes a specific shoppingListId to proceed to shopping list details page
   * @default undefined
   */
  onDoubleClick?: (shoppingListId: string) => void;
}

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
  const cartTitle = <CardTitle variant='h4'>{title}</CardTitle>;

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
