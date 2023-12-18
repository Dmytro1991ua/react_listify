import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import user from '@testing-library/user-event';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { SpyInstance, expect, vi } from 'vitest';

import { useShoppingListsModal } from './hooks/useShoppingListsModal';
import ShoppingLists from './shopping-lists';
import * as shoppingListsActions from './shopping-lists.actions';
import { DESELECT_ITEMS_CHECKBOX_LABEl, SELECT_ALL_CHECKBOX_LABEL } from './shopping-lists.contants';
import { UpdateShoppingListPayload } from './shopping-lists.interfaces';
import { Currencies } from '../../app.enums';
import { ShoppingListData } from '../../app.interfaces';
import { CUSTOM_THEME } from '../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE, defaultSortedShoppingLists } from '../../mocks/test-mocks';
import * as utils from '../../utils';
import { useShoppingListsStore } from '../shopping-lists/shopping-lists.store';

vi.doMock('axios');

describe('<ShoppingLists />', () => {
  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <ShoppingLists />
        </FormikProvider>
      </MemoryRouter>
    </ThemeProvider>
  );

  describe('<ShoppingLists /> renders shopping lists', () => {
    let shoppingListCreateActionsSpy: SpyInstance<[shoppingList: ShoppingListData], Promise<void>>;
    let shoppingListEditActionsSpy: SpyInstance<[payload: UpdateShoppingListPayload], Promise<void>>;

    beforeEach(() => {
      vi.resetAllMocks();
      vi.spyOn(utils, 'sortedItems').mockReturnValue(defaultSortedShoppingLists);
      vi.spyOn(utils, 'toBuyOrPurchasedLabel').mockReturnValue(10);
      vi.spyOn(utils, 'calculateTotalPrice').mockReturnValue(30);
      shoppingListCreateActionsSpy = vi.spyOn(shoppingListsActions, 'createShoppingListAction');
      shoppingListEditActionsSpy = vi.spyOn(shoppingListsActions, 'updateShoppingListAction');
    });

    it('should render component without crashing when shopping lists are loading', async () => {
      render(<Component />);

      expect(screen.getByText(/Shopping List/)).toBeInTheDocument();
      expect(screen.getByText(/Add List/)).toBeInTheDocument();
      expect(screen.getByTestId('bars-loading')).toBeInTheDocument();
    });

    it('should render product items', async () => {
      render(<Component />);

      const { result } = renderHook(() => useShoppingListsStore());

      expect(result.current.setShoppingListsLoadingStatus('idle'));

      expect(screen.getByText(/Varus/)).toBeInTheDocument();
      expect(screen.getByText(/Terra/)).toBeInTheDocument();
      expect(screen.getByText(/Carrefour/)).toBeInTheDocument();
      expect(screen.getAllByLabelText('To Buy: 10 / Purchased: 10')[0]).toBeInTheDocument();
      expect(screen.getAllByLabelText('To Buy: 10 / Purchased: 10')[1]).toBeInTheDocument();
      expect(screen.getByText('30 €')).toBeInTheDocument();
      expect(screen.getByText('30 $')).toBeInTheDocument();
      expect(screen.getByText('30 £')).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /menu-btn/ })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /menu-btn/ })[1]).toBeInTheDocument();
    });

    it('should call onCreateShoppingListFormSubmit method and create a new shopping list', async () => {
      render(<Component />);

      const { result } = renderHook(() =>
        useShoppingListsModal({
          formikInstance: COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance,
          shoppingListId: '1',
          setValidateAfterSubmit: vi.fn(),
        })
      );

      act(() =>
        result.current.onCreateShoppingListFormSubmit({
          name: 'Test Shopping List',
          currency: Currencies.Dollar,
        })
      );

      expect(shoppingListCreateActionsSpy).toHaveBeenCalled();
    });

    it('should call onEditShoppingListFormSubmit method and edit a particular shopping list', async () => {
      render(<Component />);

      const { result } = renderHook(() =>
        useShoppingListsModal({
          formikInstance: COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance,
          shoppingListId: '1',
          setValidateAfterSubmit: vi.fn(),
        })
      );

      act(() => result.current.onEditShoppingListFormSubmit({ name: 'test_name' }));

      expect(shoppingListEditActionsSpy).toHaveBeenCalled();
    });
  });

  describe('<ShoppingLists /> renders fallback message when there is no data', () => {
    beforeEach(() => {
      vi.resetAllMocks();
      vi.spyOn(utils, 'sortedItems').mockReturnValue([]);
    });

    it('should render fallback message when there is no data (shopping lists)', async () => {
      render(<Component />);

      const { result } = renderHook(() => useShoppingListsStore());

      expect(result.current.setShoppingListsLoadingStatus('idle'));

      expect(screen.getByText(/There is no available shopping list/)).toBeInTheDocument();
      expect(
        screen.getByText(
          /In order to keep track of your favorite shopping lists, just press "Add List" button, fill in the form within the modal window and press submit button/
        )
      ).toBeInTheDocument();
    });
  });

  describe('<ShoppingLists/> add to and remove a particular shopping list from favorites', () => {
    let addShoppingListToFavoritesActionSpy: SpyInstance<[shoppingListId: string], Promise<void>>;

    beforeEach(() => {
      vi.resetAllMocks();
      vi.spyOn(utils, 'sortedItems').mockReturnValue(defaultSortedShoppingLists);

      addShoppingListToFavoritesActionSpy = vi.spyOn(shoppingListsActions, 'addShoppingListToFavoritesAction');
    });

    it('should add to or remove a shopping list from favorites on heart icon click', async () => {
      render(<Component />);

      const favoritesIcon = screen.getAllByRole('button', { name: /favorites-icon/ })[0];

      expect(favoritesIcon).toBeInTheDocument();

      await act(async () => {
        user.click(favoritesIcon);
      });

      await waitFor(() => {
        expect(addShoppingListToFavoritesActionSpy).toHaveBeenCalled();
      });
    });
  });

  describe.only('<ShoppingLists/> select all or deselect shopping lists', () => {
    let selectAllShoppingListsActionSpy: SpyInstance;

    beforeEach(() => {
      vi.resetAllMocks();
      vi.spyOn(utils, 'sortedItems').mockReturnValue(defaultSortedShoppingLists);

      selectAllShoppingListsActionSpy = vi.spyOn(shoppingListsActions, 'selectAllShoppingListAction');
    });

    it('should select all shopping lists for deletion on checkbox click', async () => {
      vi.spyOn(utils, 'areAllItemsChecked').mockReturnValue(false);

      render(<Component />);

      const checkbox = screen.getByLabelText(SELECT_ALL_CHECKBOX_LABEL);

      expect(checkbox).toBeInTheDocument();

      await act(async () => {
        user.click(checkbox);
      });

      await waitFor(() => {
        expect(selectAllShoppingListsActionSpy).toHaveBeenCalled();
      });
    });

    it('should deselect previously selected shopping lists on checkbox click', async () => {
      vi.spyOn(utils, 'areAllItemsChecked').mockReturnValue(true);

      render(<Component />);

      const checkbox = screen.getByLabelText(DESELECT_ITEMS_CHECKBOX_LABEl);

      expect(checkbox).toBeInTheDocument();

      await act(async () => {
        user.click(checkbox);
      });

      await waitFor(() => {
        expect(selectAllShoppingListsActionSpy).toHaveBeenCalled();
      });
    });
  });
});
