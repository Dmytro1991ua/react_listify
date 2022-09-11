import { ShoppingListData, ShoppingListItem } from '../../../../app.interfaces';

export interface ShoppingListProps {
  /**
   * @param {ShoppingList} Defines a specific shopping list item to work with
   * Takes an id of that card as an argument
   * @default undefined
   */
  list?: Partial<ShoppingListData & ShoppingListItem> | null;
  /**
   * @param {HTMLElement | null} Defines (sets) the position of the menucard
   * @default undefined
   * @example <button>Open</button>
   */
  anchorElement?: HTMLElement | null;
  /**
   * @param {boolean} Defines wether menu item (dropdown) is open or not
   * @default undefined
   * @example false/true
   */
  isMenuOpened?: boolean;
  /**
   * @param {boolean} Defines if calculateByQuantity property true of false in specific user (allows to calculate a product item price and total price of specific shopping list item)
   * @default false
   * @example false/true
   */
  calculateTotalPriceByQuantity?: boolean;
  /**
   * @param {void} Defines a click event on menu and dropdown in order to close it
   * @default undefined
   */
  onMenuClose?: () => void;
  /**
   * @param {void} Defines a click event on menu in order to show a dropdown with options
   * Takes and event as an argument to determine current clicked option
   * @default undefined
   */
  onMenuOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * @param {void} Defines a double click event on specific shopping list item card
   * Takes a specific shoppingListId to proceed to shopping list details page
   * @default undefined
   */
  onDoubleClick?: (shoppingListId: string) => void;
  /**
   * @param {void} Defines a click event on delete btn in dropdown menu within specific shopping list
   * @default undefined
   */
  onModalOpen?: () => void;
  /**
   * @param {void} Defines a click event on open btn in dropdown menu within specific shopping list and redirect to details page
   * @default undefined
   */
  onRedirectToDetails?(): void;
  /**
   * @param {void} Allows to define a particular shopping list id on click to 3 dots icon
   * Shopping list id allows to delete a specific item and redirect to details page
   * Takes a specific shopping list ID as argument
   * @default undefined
   */
  onSetShoppingListId?: (id: string) => void;
}
