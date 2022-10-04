import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { ShoppingListData, ShoppingListItem } from '../../../app.interfaces';
import history from '../../../services/history.service';
import { DropdownOption } from '../../../shared/components/select/select.interfaces';
import { areAllProductItemsChecked, availableProductUnits, sortedDropdownItems, sortedItems } from '../../../utils';
import { useShoppingListsStore } from '../../shopping-lists/shopping-lists.store';

type HookProps = {
  shoppingListId: string;
  shoppingListItemId: string;
};

type ReturnedHookType = {
  currentShoppingList: ShoppingListData | null;
  allProductItemsChecked: boolean;
  sortedAvailableProductUnits: DropdownOption<string>[];
  sortedItemsByNameOrSelectedState: Partial<ShoppingListData & ShoppingListItem>[];
  getCurrentProductItem: ShoppingListItem | null;
  onGoBack: () => void;
};

export const useGetCurrentShoppingList = ({ shoppingListId, shoppingListItemId }: HookProps): ReturnedHookType => {
  const [currentShoppingList, setCurrentShoppingList] = useState<ShoppingListData | null>(null);

  const availableShoppingLists = useShoppingListsStore((state) => state.shoppingLists);

  const sortedItemsByNameOrSelectedState = useMemo(
    () => sortedItems(currentShoppingList?.shoppingListItems ?? []),
    [currentShoppingList?.shoppingListItems]
  );

  const allProductItemsChecked = areAllProductItemsChecked(
    (sortedItemsByNameOrSelectedState as ShoppingListItem[]) ?? []
  );

  const sortedAvailableProductUnits = sortedDropdownItems(availableProductUnits);

  const getCurrentProductItem = _.find(currentShoppingList?.shoppingListItems, { _id: shoppingListItemId }) ?? null;

  useEffect(() => {
    const getCurrentShoppingList = _.find(availableShoppingLists, { _id: shoppingListId }) ?? null;

    if (getCurrentShoppingList) {
      setCurrentShoppingList(getCurrentShoppingList);
    }
  }, [availableShoppingLists, shoppingListId]);

  function onGoBack(): void {
    history.goBack();
  }

  return {
    currentShoppingList,
    onGoBack,
    allProductItemsChecked,
    sortedAvailableProductUnits,
    getCurrentProductItem,
    sortedItemsByNameOrSelectedState,
  };
};
