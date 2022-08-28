import _ from 'lodash';

import { SortingItem } from './app.interfaces';

/**
 * Custom sorting utility function that allows to sort shopping lists and product items
 * @param sortingItems defines either array of Shopping lists or Product item
 * @returns Partial<ShoppingListData & ShoppingListItem>[]
 */
export const sortedItems = (sortingItems: SortingItem[]): SortingItem[] =>
  _.chain(sortingItems).flatten().sortBy('name').sortBy('isChecked').value();
