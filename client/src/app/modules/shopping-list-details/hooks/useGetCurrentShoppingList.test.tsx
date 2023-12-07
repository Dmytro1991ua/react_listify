import { renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { useGetCurrentShoppingList } from './useGetCurrentShoppingList';
import { COMMON_DEFAULT_FORMIK_INSTANCE, defaultSortedShoppingLists } from '../../../mocks/test-mocks';
import * as utils from '../../../utils';

const defaultProps = {
  shoppingListId: '1',
  shoppingListItemId: '2',
};

describe('useShoppingListsModal', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(utils, 'sortedItems').mockReturnValue(defaultSortedShoppingLists);
  });

  const hook = renderHook(() => useGetCurrentShoppingList(defaultProps), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  it('should call onGoBack method', () => {
    const { result } = hook;

    expect(result.current.onGoBack());
  });

  it('should not return currentShoppingList on first render', () => {
    const { result } = hook;

    expect(result.current.currentShoppingList).toBe(null);
  });
});
