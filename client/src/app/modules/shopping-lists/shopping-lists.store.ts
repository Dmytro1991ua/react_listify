import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { createShoppingListAction, loadAvailableShoppingListsAction } from './shopping-lists.actions';

export type ShoppingListsStoreState = {
  shoppingLists: ShoppingList[];
  shoppingList: ShoppingList;
  shoppingListsLoadingStatus: LoadingStatus;
};

export type ShoppingListsStoreActions = {
  setShoppingLists: (shoppingLists: ShoppingList[]) => void;
  createShoppingList: (shoppingList: ShoppingList) => void;
  setShoppingListsLoadingStatus: (loadingStatus: LoadingStatus) => void;
  loadAvailableShoppingLists: () => Promise<void>;
  createNewShoppingList: (shoppingList: ShoppingList) => Promise<void>;
  reset: () => void;
};

const initialState: ShoppingListsStoreState = {
  shoppingLists: [],
  shoppingList: {
    name: '',
    currency: '$',
    shoppingListItems: [],
  },
  shoppingListsLoadingStatus: 'loading',
};

export const useShoppingListsStore = create<ShoppingListsStoreState & ShoppingListsStoreActions>()(
  devtools(
    (set) => ({
      ...initialState,
      setShoppingLists: (payload) => {
        return set((state) => ({ ...state, shoppingLists: payload }), false, 'setShoppingLists');
      },
      createShoppingList: (payload) => {
        return set(
          (state) => ({ shoppingLists: [...state.shoppingLists, { ...payload }] }),
          false,
          'createShoppingList'
        );
      },
      setShoppingListsLoadingStatus: (payload) =>
        set((state) => ({ ...state, shoppingListsLoadingStatus: payload }), false, 'setShoppingListsLoadingStatus'),
      loadAvailableShoppingLists: loadAvailableShoppingListsAction,
      createNewShoppingList: createShoppingListAction,
      reset: () => set({ ...initialState, shoppingListsLoadingStatus: 'idle' }, false, 'resetShoppingListsStore'),
    }),
    { name: 'ShoppingListsStore' }
  )
);
