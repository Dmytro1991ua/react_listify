import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { Currencies } from '../../app.enums';
import { CUSTOM_THEME } from '../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE, expectedShoppingListsSortingResult } from '../../mocks/test-mocks';
import * as utils from '../../utils';
import { useShoppingListsStore } from '../shopping-lists/shopping-lists.store';
import { useShoppingListsModal } from './hooks/useShoppingListsModal';
import ShoppingLists from './shopping-lists';

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
    beforeEach(() => {
      vi.resetAllMocks();
      vi.spyOn(utils, 'sortedItems').mockReturnValue(expectedShoppingListsSortingResult);
      vi.spyOn(utils, 'toBuyOrPurchasedLabel').mockReturnValue(10);
      vi.spyOn(utils, 'calculateTotalPrice').mockReturnValue(30);
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

      expect(screen.getByText(/Nuts/)).toBeInTheDocument();
      expect(screen.getByText(/Milk/)).toBeInTheDocument();
      expect(screen.getAllByLabelText('To Buy: 10 / Purchased: 10')[0]).toBeInTheDocument();
      expect(screen.getAllByLabelText('To Buy: 10 / Purchased: 10')[1]).toBeInTheDocument();
      expect(screen.getAllByText('30 $')[0]).toBeInTheDocument();
      expect(screen.getAllByText('30 $')[1]).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /menu-btn/ })[0]).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /menu-btn/ })[1]).toBeInTheDocument();
    });

    it('should call onCreateShoppingListFormSubmit method and show loading spinner on shopping list creation', () => {
      render(<Component />);

      const { result } = renderHook(() =>
        useShoppingListsModal({
          formikInstance: COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance,
          shoppingListId: '1',
          setValidateAfterSubmit: vi.fn(),
        })
      );

      expect(
        result.current.onCreateShoppingListFormSubmit({
          name: 'Test Shopping List',
          currency: Currencies.Dollar,
        })
      );

      expect(screen.getByTestId('bars-loading')).toBeInTheDocument();
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
});
