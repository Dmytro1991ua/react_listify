import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Currencies, ProductUnits } from './app.enums';
import { CheckableItem, ShoppingListData, ShoppingListItem, SortingItem } from './app.interfaces';
import { DropdownOption } from './shared/components/select/select.interfaces';

/**
 * Custom sorting utility function that allows to sort shopping lists and product items
 * @param sortingItems defines either array of Shopping lists or Product item
 * @returns Partial<ShoppingListData & ShoppingListItem>[]
 */
export const sortedItems = (sortingItems: SortingItem[], sortByProperty: 'isChecked' | 'isFavorite'): SortingItem[] =>
  _.chain(sortingItems)
    .flatten()
    .sortBy([
      (item) => (sortByProperty === 'isChecked' ? Number(item.isChecked) : 0),
      (item) => (sortByProperty === 'isFavorite' ? -Number(item.isFavorite) : 0),
      (item) => item.name,
    ])
    .value();

/**
 * Returns transformed list of available currencies for a dropdown menu
 * @returns DropdownOption<string>[]
 */
export const availableCurrencies: DropdownOption<string>[] = Object.entries(Currencies).flatMap((currency) => ({
  id: uuidv4(),
  value: currency[1],
  label: currency[1],
}));

/**
 * Returns transformed list of available product units for a dropdown menu
 * @returns DropdownOption<string>[]
 */
export const availableProductUnits: DropdownOption<string>[] = Object.entries(ProductUnits).flatMap((unit) => ({
  id: uuidv4(),
  value: unit[1],
  label: unit[1],
}));

/**
 * Function returns a sorted list of available items for a dropdown menu
 * @returns DropdownOption<string>[]
 */
export const sortedDropdownItems = (items: DropdownOption<string>[]) => {
  return _.sortBy(items, 'label');
};

/**
 * Function calculates the price of specific product item
 * @returns number
 */
export const calculateProductItemPrice = (price: number, quantity: number): number => {
  return price * quantity;
};

/**
 * Function calculates the price of specific product item based on user preferences (if calculateByQuantity is true or false)
 * @returns number
 */
export const calculateByQuantity = (
  price: number,
  quantity: number,
  calculateTotalPriceByQuantity: boolean
): number => {
  return calculateTotalPriceByQuantity ? calculateProductItemPrice(price, quantity) : price;
};

/**
 * Function calculates the total price of all product item of specific shopping list item and returns a total price
 * @returns number
 */
export const calculateTotalPrice = (
  shoppingListItems: ShoppingListItem[],
  calculateTotalPriceByQuantity: boolean
): number => {
  return _.sumBy(shoppingListItems, (item) => {
    return calculateTotalPriceByQuantity ? calculateProductItemPrice(item.price, item.quantity) : item.price;
  });
};

/**
 * Function calculates total To Buy or Purchased values, within Shopping list details widget, based on passed boolean flag
 * @returns number
 */
export const calculateProductItemsByCheckedSate = (
  shoppingListItems: ShoppingListItem[],
  itemsState: boolean,
  calculateTotalPriceByQuantity: boolean
): number => {
  const productItemsByCheckedSate = _.filter(shoppingListItems, (item) => item.isChecked === itemsState);
  return _.sumBy(productItemsByCheckedSate, (item) =>
    calculateTotalPriceByQuantity ? calculateProductItemPrice(item.price, item.quantity) : item.price
  );
};

/**
 * Function checks if all product item were selected (checked)
 * @returns boolean
 */
export const areAllItemsChecked = <T extends CheckableItem>(items: T[]): boolean => {
  if (!items.length) return false;

  return items.every((item) => item.isChecked);
};

/**
 * Function checks if some shopping list items are checked
 * @returns boolean
 */
export const areSomeItemsChecked = <T extends CheckableItem>(items: T[]): boolean =>
  items.some((item) => item.isChecked);

/**
 * Function returns all shopping list items with isChecked property equal to true (select all items)
 * @returns ShoppingListItem[]
 */
export const toggleAllProductItems = <T,>(items: T[], isChecked: boolean): T[] =>
  _.map(items, (item) => ({
    ...item,
    isChecked,
  }));

/**
 * Function determines and return value for To Buy and Purchased shopping list item based on isChecked property
 * @returns number | undefined
 */
export const toBuyOrPurchasedLabel = (shoppingListItems: ShoppingListItem[], value: boolean): number | undefined => {
  return shoppingListItems?.filter((item) => item.isChecked === value).length;
};

/**
 * Function finds current Shopping List by its id
 * @param availableShoppingLists defines an array of available Shopping lists
 * @param shoppingListId defines an ID of a specific Shopping list
 * @returns ShoppingListData | null
 */
export const getCurrentShoppingList = (availableShoppingLists: ShoppingListData[], shoppingListId: string) =>
  _.find(availableShoppingLists, { _id: shoppingListId }) ?? null;

/**
 * Function toggles the 'isChecked' property of a selected item in an array based on its '_id'.
 * @param items The array of items.
 * @param id The '_id' of the item to be modified.
 * @returns An object containing the updated array and the selected item.
 */
export const toggleIsCheckedPropertyById = <T extends CheckableItem>(items: T[], id?: string): T | null => {
  const updatedItems = _.map(items, (item) => (item._id === id ? { ...item, isChecked: !item.isChecked } : item));

  return (_.find(updatedItems, { _id: id }) as T | undefined) ?? null;
};
