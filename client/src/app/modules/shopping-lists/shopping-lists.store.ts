import create from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  createShoppingListItemAction,
  deleteShoppingListItemAction,
  selectShoppingListItemAction,
} from './../shopping-list-details/shopping-list-details.actions';
import {
  createShoppingListAction,
  deleteShoppingListAction,
  loadAvailableShoppingListsAction,
} from './shopping-lists.actions';
import { ShoppingListsStoreActions, ShoppingListsStoreState } from './shopping-lists.interfaces';

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
      deleteShoppingListItem: (payload) => {
        return set(
          (state) => ({
            shoppingLists: state.shoppingLists.map((list) => (list._id === payload._id ? payload : list)),
          }),
          false,
          'deleteShoppingListItem'
        );
      },
      checkShoppingListItem: (payload) => {
        return set(
          (state) => ({
            shoppingLists: state.shoppingLists.map((list) => (list._id === payload._id ? payload : list)),
          }),
          false,
          'selectShoppingListItem'
        );
      },
      setShoppingListsLoadingStatus: (payload) =>
        set((state) => ({ ...state, shoppingListsLoadingStatus: payload }), false, 'setShoppingListsLoadingStatus'),
      loadAvailableShoppingLists: loadAvailableShoppingListsAction,
      createNewShoppingList: createShoppingListAction,
      createNewShoppingListItem: createShoppingListItemAction,
      removeShoppingList: deleteShoppingListAction,
      removeShoppingListItem: deleteShoppingListItemAction,
      selectShoppingListItem: selectShoppingListItemAction,
      reset: () => set({ ...initialState, shoppingListsLoadingStatus: 'idle' }, false, 'resetShoppingListsStore'),
    }),
    { name: 'ShoppingListsStore' }
  )
);
