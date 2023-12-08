import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { ShoppingListData, ShoppingListItem } from '../../../app.interfaces';
import history from '../../../services/history.service';
import { DropdownOption } from '../../../shared/components/select/select.interfaces';
import {
  areAllItemsChecked,
  areSomeItemsChecked,
  availableProductUnits,
  getCurrentShoppingList,
  sortedDropdownItems,
  sortedItems,
} from '../../../utils';
import { useShoppingListsStore } from '../../shopping-lists/shopping-lists.store';

type HookProps = {
  shoppingListId: string;
  shoppingListItemId: string;
};

type ReturnedHookType = {
  currentShoppingList: ShoppingListData | null;
  allProductItemsChecked: boolean;
  someProductItemsChecked: boolean;
  sortedAvailableProductUnits: DropdownOption<string>[];
  sortedItemsByNameOrSelectedState: Partial<ShoppingListData & ShoppingListItem>[];
  getCurrentProductItem: ShoppingListItem | null;
  onGoBack: () => void;
};

export const useGetCurrentShoppingList = ({ shoppingListId, shoppingListItemId }: HookProps): ReturnedHookType => {
  const [currentShoppingList, setCurrentShoppingList] = useState<ShoppingListData | null>(null);

  const availableShoppingLists = useShoppingListsStore((state) => state.shoppingLists);

  const sortedItemsByNameOrSelectedState = useMemo(
    () => sortedItems(currentShoppingList?.shoppingListItems ?? [], 'isChecked'),
    [currentShoppingList?.shoppingListItems]
  );

  const allProductItemsChecked = areAllItemsChecked<ShoppingListItem>(
    (sortedItemsByNameOrSelectedState as ShoppingListItem[]) ?? []
  );

  const someProductItemsChecked = areSomeItemsChecked<ShoppingListItem>(
    (sortedItemsByNameOrSelectedState as ShoppingListItem[]) ?? []
  );

  const sortedAvailableProductUnits = sortedDropdownItems(availableProductUnits);

  const getCurrentProductItem = _.find(currentShoppingList?.shoppingListItems, { _id: shoppingListItemId }) ?? null;

  useEffect(() => {
    const currentShoppingList = getCurrentShoppingList(availableShoppingLists, shoppingListId);

    setCurrentShoppingList(currentShoppingList);
  }, [availableShoppingLists, shoppingListId]);

  function onGoBack(): void {
    history.goBack();
  }

  return {
    currentShoppingList,
    onGoBack,
    allProductItemsChecked,
    someProductItemsChecked,
    sortedAvailableProductUnits,
    getCurrentProductItem,
    sortedItemsByNameOrSelectedState,
  };
};
