export interface CardDescriptionContentProps {
  /**
   * @param {number} Defines a product/unit quantity on specific shopping list card or shopping list details card
   * @default 0
   * @example 10,20
   */
  quantity?: number;
  /**
   * @param {number} Defines a total products price on specific shopping list card (total price of all shopping list details item related to a specific shopping list card)
   * @default 0
   * @example 10,20
   */
  totalPrice?: number;
  /**
   * @param {number} Defines a unit price on specific shopping list details card
   * @default 0
   * @example 10,20
   */
  price?: number;
  /**
   * @param {string} Defines a unit currency on specific shopping list details card
   * @default $
   * @example $
   */
  currency?: string;
  /**
   * @param {boolean} Defines if we currently work with shopping list card in order to show a specific data related to this card
   * Establish difference between shopping list and shopping list details cards
   * @default undefined
   * @example true/false
   */
  isShoppingList?: boolean;
}
