import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { Currencies, ProductUnits } from '../../app.enums';
import { ShoppingListsStoreActions, ShoppingListsStoreState } from './shopping-lists.interfaces';

const initialState: ShoppingListsStoreState = {
  shoppingLists: [],
  shoppingList: {
    name: '',
    currency: Currencies.Dollar,
    shoppingListItems: [],
    isFavorite: false,
  },
  shoppingListItem: {
    name: '',
    //category
    quantity: 0,
    units: ProductUnits.Default,
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
      updateShoppingList: (payload) => {
        return set(
          (state) => ({
            shoppingLists: state.shoppingLists.map((list) => (list._id === payload._id ? payload : list)),
          }),
          false,
          'updateShoppingList'
        );
      },
      selectAllShoppingListItems: ({ id, items }) => {
        return set(
          (state) => ({
            shoppingLists: state.shoppingLists.map((list) => {
              if (list._id === id) {
                return { ...list, shoppingListItems: items };
              }

              return list;
            }),
          }),
          false,
          'selectAllShoppingListItemItems'
        );
      },
      setShoppingListsLoadingStatus: (payload) =>
        set((state) => ({ ...state, shoppingListsLoadingStatus: payload }), false, 'setShoppingListsLoadingStatus'),
      reset: () => set({ ...initialState, shoppingListsLoadingStatus: 'idle' }, false, 'resetShoppingListsStore'),
    }),
    { name: 'ShoppingListsStore' }
  )
);
