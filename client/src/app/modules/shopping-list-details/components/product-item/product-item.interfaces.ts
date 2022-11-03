import { ShoppingListData, ShoppingListItem } from '../../../../app.interfaces';

export interface ProductItemProps {
  /**
   * @param {Partial<ShoppingListData & ShoppingListItem>} Defines a specific shopping list or shopping list item
   */
  item: Partial<ShoppingListData & ShoppingListItem>;
  /**
   * @param {string} name The name of the item a specific shopping list or shopping list item
   * @default Currencies.Dollar
   * @example Currencies.Dollar, Currencies.Euro
   */
  currency: string;
  /**
   * @param {boolean} Defines if calculateByQuantity property true of false in specific user (allows to calculate a product item price and total price of specific shopping list item)
   * @default false
   * @example false/true
   */
  calculateTotalPriceByQuantity?: boolean;
  isShoppingList?: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onClick: (id: string) => Promise<void>;
}
