export interface CreateShoppingListFromInitialValues {
  name: string;
  currency?: string;
}

export type ShoppingListsStoreState = {
  shoppingLists: ShoppingList[];
  shoppingList: ShoppingList;
  shoppingListItem: ShoppingListItem;
  shoppingListsLoadingStatus: LoadingStatus;
};

export type ShoppingListsStoreActions = {
  setShoppingLists: (shoppingLists: ShoppingList[]) => void;
  createShoppingList: (shoppingList: ShoppingList) => void;
  deleteShoppingList: (id: string) => void;
  createShoppingListItem: (shoppingList: ShoppingList) => void;
  deleteShoppingListItem: (shoppingList: ShoppingList) => void;
  setShoppingListsLoadingStatus: (loadingStatus: LoadingStatus) => void;
  loadAvailableShoppingLists: () => Promise<void>;
  createNewShoppingList: (shoppingList: ShoppingList) => Promise<void>;
  createNewShoppingListItem: (id: string, shoppingListItem: ShoppingListItem) => Promise<void>;
  removeShoppingList: (id: string) => Promise<void>;
  removeShoppingListItem: (id: string, productItemId: string) => Promise<void>;
  reset: () => void;
};
