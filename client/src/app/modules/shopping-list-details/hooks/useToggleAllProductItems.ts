import { ShoppingListData, ShoppingListItem } from '../../../app.interfaces';
import { toggleAllProductItems } from '../../../utils';
import { selectAllShoppingListItemsAction } from '../shopping-list-details.actions';

type HookProps = {
  id: string;
  sortedItemsByNameOrSelectedState: Partial<ShoppingListData & ShoppingListItem>[];
};

type ReturnedHookType = {
  onToggleAllProductItems: (isChecked: boolean) => Promise<void>;
};

export const useToggleAllProductItems = ({ id, sortedItemsByNameOrSelectedState }: HookProps): ReturnedHookType => {
  async function onToggleAllProductItems(isChecked: boolean): Promise<void> {
    const updatedShoppingListItems = toggleAllProductItems(
      sortedItemsByNameOrSelectedState as ShoppingListItem[],
      isChecked
    );
    await selectAllShoppingListItemsAction(id ?? '', updatedShoppingListItems);
  }

  return { onToggleAllProductItems };
};
