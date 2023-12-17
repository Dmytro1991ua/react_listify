import { Currencies } from '../../app.enums';
import { LoadingStatus, ShoppingListData, ShoppingListItem } from '../../app.interfaces';

export interface CreateShoppingListFromInitialValues {
  name: string;
  currency?: Currencies;
}

export type ShoppingListsStoreState = {
  shoppingLists: ShoppingListData[];
  shoppingList: ShoppingListData;
  shoppingListItem: ShoppingListItem;
  shoppingListsLoadingStatus: LoadingStatus;
};

type updateShoppingListItemsPayload = {
  id: string;
  items: ShoppingListItem[];
};

export type ShoppingListsStoreActions = {
  setShoppingLists: (shoppingLists: ShoppingListData[]) => void;
  createShoppingList: (shoppingList: ShoppingListData) => void;
  deleteShoppingList: (id: string) => void;
  updateShoppingList: (shoppingList: ShoppingListData) => void;
  updateShoppingLists: (shoppingLists: ShoppingListData[]) => void;
  selectAllShoppingListItems: (payload: updateShoppingListItemsPayload) => void;
  setShoppingListsLoadingStatus: (loadingStatus: LoadingStatus) => void;
  reset: () => void;
};

export type UpdateShoppingListPayload = {
  shoppingListData: { name: string };
  shoppingListId: string;
};
