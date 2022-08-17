import { shoppingListsService } from './shopping-lists.service';
import { useShoppingListsStore } from './shopping-lists.store';

export const loadAvailableShoppingListsAction = async (): Promise<void> => {
  const setShoppingLists = useShoppingListsStore.getState().setShoppingLists;
  const setShoppingListsLoadingStatus = useShoppingListsStore.getState().setShoppingListsLoadingStatus;

  setShoppingListsLoadingStatus('loading');
  try {
    const availableShoppingLists = await shoppingListsService.getAvailableShoppingLists();

    setShoppingLists(availableShoppingLists);
    setShoppingListsLoadingStatus('idle');
  } catch (error) {
    setShoppingLists([]);
    setShoppingListsLoadingStatus('failed');
    throw new Error((error as Error).message);
  }
};

export const createShoppingListAction = async (shoppingList: ShoppingList): Promise<void> => {
  const createShoppingList = useShoppingListsStore.getState().createShoppingList;
  const setShoppingListsLoadingStatus = useShoppingListsStore.getState().setShoppingListsLoadingStatus;

  setShoppingListsLoadingStatus('loading');

  try {
    const newShoppingList = await shoppingListsService.createShoppingList(shoppingList);

    if (newShoppingList) {
      createShoppingList(newShoppingList);
    }

    setShoppingListsLoadingStatus('idle');
  } catch (error) {
    setShoppingListsLoadingStatus('failed');
    throw new Error((error as Error).message);
  }
};

export const deleteShoppingListAction = async (id: string) => {
  const setShoppingListsLoadingStatus = useShoppingListsStore.getState().setShoppingListsLoadingStatus;
  const deleteShoppingList = useShoppingListsStore.getState().deleteShoppingList;

  try {
    setShoppingListsLoadingStatus('loading');

    const deletedShoppingList = await shoppingListsService.deleteShoppingList(id);

    if (deletedShoppingList) {
      deleteShoppingList(deletedShoppingList);
    }

    setShoppingListsLoadingStatus('idle');
  } catch (err) {
    setShoppingListsLoadingStatus('failed');
  }
};
