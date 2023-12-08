import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';

import { useCRUDProductItem } from './hooks/useCRUDProductItem';
import { useCRUDShoppingList } from './hooks/useCRUDShoppingList';
import * as useCustomHookGetCurrentShoppingList from './hooks/useGetCurrentShoppingList';
import ShoppingListDetails from './shopping-list-details';
import * as shoppingListDetailsActions from './shopping-list-details.actions';
import { Currencies, ProductUnits } from '../../app.enums';
import { ShoppingListData, UpdateShoppingListItemActionPayload } from '../../app.interfaces';
import { CUSTOM_THEME } from '../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE, defaultShoppingLists } from '../../mocks/test-mocks';
import * as shoppingListsActions from '../shopping-lists/shopping-lists.actions';
import { useShoppingListsStore } from '../shopping-lists/shopping-lists.store';

describe('<ShoppingListDetails />', () => {
  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <ShoppingListDetails />
        </FormikProvider>
      </MemoryRouter>
    </ThemeProvider>
  );

  describe('<ShoppingListDetails /> renders product items', () => {
    let shoppingListCreateActionsSpy: SpyInstance<[shoppingList: ShoppingListData], Promise<void>>;
    let productItemEditSpy: SpyInstance<[payload: UpdateShoppingListItemActionPayload], Promise<void>>;

    beforeEach(() => {
      vi.resetAllMocks();
      vi.spyOn(useCustomHookGetCurrentShoppingList, 'useGetCurrentShoppingList').mockImplementation(() => ({
        currentShoppingList: defaultShoppingLists[0],
        onGoBack: vi.fn(),
        allProductItemsChecked: false,
        someProductItemsChecked: false,
        sortedAvailableProductUnits: [],
        getCurrentProductItem: null,
        sortedItemsByNameOrSelectedState: defaultShoppingLists[0].shoppingListItems,
      }));
      shoppingListCreateActionsSpy = vi.spyOn(shoppingListsActions, 'createShoppingListAction');
      productItemEditSpy = vi.spyOn(shoppingListDetailsActions, 'updateShoppingListItemAction');
    });

    it('should render component without crashing when product items are loading', async () => {
      render(<Component />);

      expect(screen.getByRole('button', { name: /go-back/ })).toBeInTheDocument();
      expect(screen.getByText(/Copy List/)).toBeInTheDocument();
      expect(screen.getByText(/Delete List/)).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', {
          name: /text-input/,
        })
      ).toBeInTheDocument();
      expect(screen.getByText(/To Buy:/)).toBeInTheDocument();
      expect(screen.getByText(/Purchased:/)).toBeInTheDocument();
      expect(screen.getByTestId('audio-loading')).toBeInTheDocument();
    });

    it('should render product items', async () => {
      render(<Component />);

      const { result } = renderHook(() => useShoppingListsStore());

      expect(result.current.setShoppingListsLoadingStatus('idle'));

      expect(screen.getByText(/Apple/)).toBeInTheDocument();
      expect(screen.getByText('2 Kg')).toBeInTheDocument();
      expect(screen.getByText('4 $')).toBeInTheDocument();
      expect(screen.getByText(/Orange/)).toBeInTheDocument();
      expect(screen.getByText('3 Kg')).toBeInTheDocument();
      expect(screen.getByText('12 $')).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /edit-btn/ })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /edit-btn/ })[1]).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /delete-btn/ })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /delete-btn/ })[1]).toBeInTheDocument();
      expect(screen.getByText(/Select All Items/)).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox')[1]).toBeInTheDocument();
    });

    it('should call onCreateShoppingListCopy method and show loading spinner on shopping list copy creation', () => {
      render(<Component />);

      const { result } = renderHook(() =>
        useCRUDShoppingList({
          currency: Currencies.Euro,
          shoppingListItems: [],
          shoppingListId: '1',
          onCloseModal: vi.fn(),
        })
      );

      expect(
        result.current.onCreateShoppingListCopy({
          name: 'Test Shopping List Copy',
        })
      );

      expect(shoppingListCreateActionsSpy).toHaveBeenCalled();
    });

    it('should call onEditProductItemFormSubmit method and show loading spinner on shopping list copy creation', () => {
      render(<Component />);

      const { result } = renderHook(() =>
        useCRUDProductItem({
          shoppingListId: '2',
          shoppingListItemId: '3',
          onSetValidateAfterSubmit: vi.fn(),
          shoppingListItems: [],
          onCloseModal: vi.fn(),
          onCloseDeleteModal: vi.fn(),
        })
      );

      expect(
        result.current.onEditProductItemFormSubmit({
          name: 'Milk',
          price: 10,
          quantity: 2,
          unit: ProductUnits.Liter,
        })
      );

      expect(productItemEditSpy).toHaveBeenCalled();
    });
  });

  describe('<ShoppingListDetails /> renders fallback message when there is no data', () => {
    beforeEach(() => {
      vi.resetAllMocks();
      vi.spyOn(useCustomHookGetCurrentShoppingList, 'useGetCurrentShoppingList').mockImplementation(() => ({
        currentShoppingList: defaultShoppingLists[2],
        onGoBack: vi.fn(),
        allProductItemsChecked: false,
        sortedAvailableProductUnits: [],
        getCurrentProductItem: null,
        sortedItemsByNameOrSelectedState: defaultShoppingLists[2].shoppingListItems,
      }));
    });

    it('should render fallback message when there is no data (product items)', async () => {
      render(<Component />);

      const { result } = renderHook(() => useShoppingListsStore());

      expect(result.current.setShoppingListsLoadingStatus('idle'));

      expect(screen.getByText(/There is no available products in your shopping list/)).toBeInTheDocument();
      expect(
        screen.getByText(
          /In order to keep track of your favorite products within this shopping list, just enter the desired name of the product within the input field above/
        )
      ).toBeInTheDocument();
    });
  });
});
