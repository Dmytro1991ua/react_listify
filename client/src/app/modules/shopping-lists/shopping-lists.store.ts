import create from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  createShoppingListAction,
  deleteShoppingListAction,
  loadAvailableShoppingListsAction,
} from './shopping-lists.actions';

export type ShoppingListsStoreState = {
  shoppingLists: ShoppingList[];
  shoppingList: ShoppingList;
  shoppingListsLoadingStatus: LoadingStatus;
};

export type ShoppingListsStoreActions = {
  setShoppingLists: (shoppingLists: ShoppingList[]) => void;
  createShoppingList: (shoppingList: ShoppingList) => void;
  deleteShoppingList: (id: string) => void;
  setShoppingListsLoadingStatus: (loadingStatus: LoadingStatus) => void;
  loadAvailableShoppingLists: () => Promise<void>;
  createNewShoppingList: (shoppingList: ShoppingList) => Promise<void>;
  removeShoppingList: (id: string) => Promise<void>;
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
      deleteShoppingList: (payload) => {
        return set(
          (state) => ({
            shoppingLists: state.shoppingLists.filter((shoppingList) => shoppingList._id !== payload),
          }),
          false,
          'deleteShoppingList'
        );
      },
      setShoppingListsLoadingStatus: (payload) =>
        set((state) => ({ ...state, shoppingListsLoadingStatus: payload }), false, 'setShoppingListsLoadingStatus'),
      loadAvailableShoppingLists: loadAvailableShoppingListsAction,
      createNewShoppingList: createShoppingListAction,
      removeShoppingList: deleteShoppingListAction,
      reset: () => set({ ...initialState, shoppingListsLoadingStatus: 'idle' }, false, 'resetShoppingListsStore'),
    }),
    { name: 'ShoppingListsStore' }
  )
);
