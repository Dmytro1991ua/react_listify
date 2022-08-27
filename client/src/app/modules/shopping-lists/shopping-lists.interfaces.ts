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

export type ShoppingListsStoreActions = {
  setShoppingLists: (shoppingLists: ShoppingListData[]) => void;
  createShoppingList: (shoppingList: ShoppingListData) => void;
  deleteShoppingList: (id: string) => void;
  createShoppingListItem: (shoppingList: ShoppingListData) => void;
  deleteShoppingListItem: (shoppingList: ShoppingListData) => void;
  setShoppingListsLoadingStatus: (loadingStatus: LoadingStatus) => void;
  loadAvailableShoppingLists: () => Promise<void>;
  createNewShoppingList: (shoppingList: ShoppingListData) => Promise<void>;
  createNewShoppingListItem: (id: string, shoppingListItem: ShoppingListItem) => Promise<void>;
  removeShoppingList: (id: string) => Promise<void>;
  removeShoppingListItem: (id: string, productItemId: string) => Promise<void>;
  reset: () => void;
};
