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
  createShoppingListItem: (shoppingList: ShoppingListData) => void;
  deleteShoppingListItem: (shoppingList: ShoppingListData) => void;
  checkShoppingListItem: (shoppingList: ShoppingListData) => void;
  updateShoppingListItem: (shoppingList: ShoppingListData) => void;
  selectAllShoppingListItems: (payload: updateShoppingListItemsPayload) => void;
  setShoppingListsLoadingStatus: (loadingStatus: LoadingStatus) => void;
  reset: () => void;
};
