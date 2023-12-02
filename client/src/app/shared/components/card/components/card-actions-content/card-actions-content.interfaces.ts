export interface CardActionsContentProps {
  /**
   * @param {HTMLElement | null} Defines (sets) the position of the menu card
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
   * @param {boolean} Defines if we currently work with shopping list card in order to show a specific data related to this card
   * Establish difference between shopping list and shopping list details cards
   * @default undefined
   * @example true/false
   */
  isShoppingList?: boolean;
  /**
   * @param {string} Defines a specific shopping list id
   * @default undefined
   * @example 52c7c0ce-f5ef-47bc-b33d-687452e39fce
   */
  shoppingListId?: string;
  /**
   * @param {boolean} Defines if a specific shopping list item was selected
   * @default undefined
   * @example true/false
   */
  isSelected?: boolean;
  /**
   *  /**
   * @param {boolean} Defines if a specific shopping list was added or removed from favorites
   * @default undefined
   * @example true/false
   */
  isFavorite?: boolean;
  /**
   * @param {void} Defines a click event on menu in order to show a dropdown with options
   * Takes and event as an argument to determine current clicked option
   * @default undefined
   */
  onMenuOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * @param {void} Defines a click event on menu and dropdown in order to close it
   * @default undefined
   */
  onMenuClose?: () => void;
  /**
   * @param {void} Defines a click event on Edit button within specific shopping list details card
   * Takes an id of that card as an argument
   * @default undefined
   */
  onEditProductItem?: (id: string) => void;
  /**
   * @param {void} Defines a click event on Delete button within specific shopping list details card
   * Takes an id of that card as an argument
   * @default undefined
   */
  onDelete?: (id: string) => void | Promise<void>;
  /**
   * @param {void} Defines a click event on delete btn in dropdown menu within specific shopping list
   * @default undefined
   */
  onModalOpen?: () => void;
  /**
   * @param {void} Defines a click event on open btn in dropdown menu within specific shopping list and redirect to details page
   * @default undefined
   */
  onRedirectToDetails?: () => void;
  /**
   * @param {void} Allows to define a particular shopping list id on click to 3 dots icon
   * Shopping list id allows to delete a specific item and redirect to details page
   * Takes a specific shopping list ID as argument
   * @default undefined
   */
  onSetShoppingListId?: (id: string) => void;
  /**
   * @param {void} Defines a click event on Edit button within specific shopping list
   * Takes an id of that shopping list as an argument
   * @default undefined
   */
  onEditShoppingList?: (id: string) => void;
  /**
   * @param {void} Defines a click event on Favorites icon within specific shopping list
   * Takes an id of that shopping list as an argument
   * @default undefined
   */
  onAddToFavorites?: (id: string) => Promise<void>;
}
