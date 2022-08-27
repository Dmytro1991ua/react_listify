import { ShoppingListItem } from '../../app.interfaces';
import { useShoppingListsStore } from '../shopping-lists/shopping-lists.store';
import { shoppingListDetailsService } from './shopping-list-details.service';

export const createShoppingListItemAction = async (id: string, shoppingListItem: ShoppingListItem): Promise<void> => {
  const createNewShoppingListItem = useShoppingListsStore.getState().createShoppingListItem;
  const setShoppingListsLoadingStatus = useShoppingListsStore.getState().setShoppingListsLoadingStatus;

  setShoppingListsLoadingStatus('loading');

  try {
    const updatedShoppingList = await shoppingListDetailsService.createShoppingListItem(id, shoppingListItem);

    if (updatedShoppingList) {
      createNewShoppingListItem(updatedShoppingList);
    }

    setShoppingListsLoadingStatus('idle');
  } catch (error) {
    setShoppingListsLoadingStatus('failed');
    throw new Error((error as Error).message);
  }
};

export const deleteShoppingListItemAction = async (id: string, productItemId: string): Promise<void> => {
  const deleteExistingShoppingListItem = useShoppingListsStore.getState().deleteShoppingListItem;
  const setShoppingListsLoadingStatus = useShoppingListsStore.getState().setShoppingListsLoadingStatus;

  setShoppingListsLoadingStatus('loading');

  try {
    const updatedShoppingList = await shoppingListDetailsService.deleteShoppingListItem(id, productItemId);

    if (updatedShoppingList) {
      deleteExistingShoppingListItem(updatedShoppingList);
    }

    setShoppingListsLoadingStatus('idle');
  } catch (error) {
    setShoppingListsLoadingStatus('failed');
    throw new Error((error as Error).message);
  }
};
