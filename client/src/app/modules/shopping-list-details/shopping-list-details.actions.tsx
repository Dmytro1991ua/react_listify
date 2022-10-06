import { ShoppingListItem, UpdateShoppingListItemActionPayload } from '../../app.interfaces';
import { useShoppingListsStore } from '../shopping-lists/shopping-lists.store';
import { shoppingListDetailsService } from './shopping-list-details.service';

export const updateShoppingListItemAction = async (payload: UpdateShoppingListItemActionPayload): Promise<void> => {
  const { shoppingListItem, url, successMessage, failedMessage, serviceMethod } = payload;

  const setShoppingListsLoadingStatus = useShoppingListsStore.getState().setShoppingListsLoadingStatus;
  const updateShoppingList = useShoppingListsStore.getState().updateShoppingList;

  try {
    const updatedShoppingList = await serviceMethod({ shoppingListItem, url, successMessage, failedMessage });

    if (updatedShoppingList) {
      updateShoppingList(updatedShoppingList);
    }
  } catch (error) {
    setShoppingListsLoadingStatus('failed');
    throw new Error((error as Error).message);
  }
};

export const deleteShoppingListItemAction = async (id: string, productItemId: string): Promise<void> => {
  const deleteExistingShoppingListItem = useShoppingListsStore.getState().updateShoppingList;
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

export const selectAllShoppingListItemsAction = async (
  id: string,
  shoppingListItems: ShoppingListItem[]
): Promise<void> => {
  const setShoppingListsLoadingStatus = useShoppingListsStore.getState().setShoppingListsLoadingStatus;
  const updateShoppingList = useShoppingListsStore.getState().selectAllShoppingListItems;

  try {
    const updatedShoppingList = await shoppingListDetailsService.selectAllShoppingListItems(id, shoppingListItems);

    if (updatedShoppingList) {
      updateShoppingList({ id: updatedShoppingList._id ?? '', items: updatedShoppingList.shoppingListItems });
    }
  } catch (error) {
    setShoppingListsLoadingStatus('failed');
    throw new Error((error as Error).message);
  }
};
