import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { createShoppingListItemAction } from './../shopping-list-details/shopping-list-details.actions';
import {
  createShoppingListAction,
  deleteShoppingListAction,
  loadAvailableShoppingListsAction,
} from './shopping-lists.actions';

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
  setShoppingListsLoadingStatus: (loadingStatus: LoadingStatus) => void;
  loadAvailableShoppingLists: () => Promise<void>;
  createNewShoppingList: (shoppingList: ShoppingList) => Promise<void>;
  createNewShoppingListItem: (id: string, shoppingListItem: ShoppingListItem) => Promise<void>;
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
  shoppingListItem: {
    name: '',
    //category
    quantity: 0,
    units: 'units',
    price: 0,
    isChecked: false,
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
      createShoppingListItem: (payload) => {
        return set(
          (state) => ({
            shoppingLists: state.shoppingLists.map((list) => (list._id === payload._id ? payload : list)),
          }),
          false,
          'createShoppingListItem'
        );
      },
      setShoppingListsLoadingStatus: (payload) =>
        set((state) => ({ ...state, shoppingListsLoadingStatus: payload }), false, 'setShoppingListsLoadingStatus'),
      loadAvailableShoppingLists: loadAvailableShoppingListsAction,
      createNewShoppingList: createShoppingListAction,
      createNewShoppingListItem: createShoppingListItemAction,
      removeShoppingList: deleteShoppingListAction,
      reset: () => set({ ...initialState, shoppingListsLoadingStatus: 'idle' }, false, 'resetShoppingListsStore'),
    }),
    { name: 'ShoppingListsStore' }
  )
);
