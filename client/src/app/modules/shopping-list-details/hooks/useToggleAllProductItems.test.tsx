import { renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';

import { ShoppingListItem } from '../../../app.interfaces';
import { COMMON_DEFAULT_FORMIK_INSTANCE, expectedShoppingListsSortingResult } from '../../../mocks/test-mocks';
import * as shoppingListDetailsActions from '../shopping-list-details.actions';
import { useToggleAllProductItems } from './useToggleAllProductItems';

const defaultProps = {
  id: '1',
  sortedItemsByNameOrSelectedState: expectedShoppingListsSortingResult,
};

describe('useToggleAllProductItems', () => {
  let shoppingListDetailsSelectAllActionsSpy: SpyInstance<
    [id: string, shoppingListItems: ShoppingListItem[]],
    Promise<void>
  >;

  beforeEach(() => {
    vi.resetAllMocks();
    shoppingListDetailsSelectAllActionsSpy = vi.spyOn(shoppingListDetailsActions, 'selectAllShoppingListItemsAction');
  });

  const hook = renderHook(() => useToggleAllProductItems(defaultProps), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  it('should call onToggleAllProductItems method', () => {
    const { result } = hook;

    expect(result.current.onToggleAllProductItems(true)).rejects.toThrow();

    expect(shoppingListDetailsSelectAllActionsSpy).toHaveBeenCalled();
  });
});
