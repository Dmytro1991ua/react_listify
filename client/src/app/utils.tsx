import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Currencies, ProductUnits } from './app.enums';
import { SortingItem } from './app.interfaces';
import { DropdownOption } from './shared/components/select/select.interfaces';

/**
 * Custom sorting utility function that allows to sort shopping lists and product items
 * @param sortingItems defines either array of Shopping lists or Product item
 * @returns Partial<ShoppingListData & ShoppingListItem>[]
 */
export const sortedItems = (sortingItems: SortingItem[]): SortingItem[] =>
  _.chain(sortingItems).flatten().sortBy('name').sortBy('isChecked').value();

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
