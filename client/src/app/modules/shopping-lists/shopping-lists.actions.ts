import { ShoppingListData } from '../../app.interfaces';
import { UpdateShoppingListPayload } from './shopping-lists.interfaces';
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

export const createShoppingListAction = async (shoppingList: ShoppingListData): Promise<void> => {
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

export const updateShoppingListAction = async (payload: UpdateShoppingListPayload): Promise<void> => {
  const setShoppingListsLoadingStatus = useShoppingListsStore.getState().setShoppingListsLoadingStatus;
  const updateShoppingList = useShoppingListsStore.getState().updateShoppingList;

  try {
    setShoppingListsLoadingStatus('loading');

    const updatedShoppingList = await shoppingListsService.updateShoppingList(payload);

    if (updatedShoppingList) {
      updateShoppingList(updatedShoppingList);
    }

    setShoppingListsLoadingStatus('idle');
  } catch (error) {
    setShoppingListsLoadingStatus('failed');
    throw new Error((error as Error).message);
  }
};

export const addShoppingListToFavoritesAction = async (id: string): Promise<void> => {
  const updateShoppingList = useShoppingListsStore.getState().updateShoppingList;

  try {
    const updatedShoppingList = await shoppingListsService.addShoppingListToFavorites(id);

    if (updatedShoppingList) {
      updateShoppingList(updatedShoppingList);
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
