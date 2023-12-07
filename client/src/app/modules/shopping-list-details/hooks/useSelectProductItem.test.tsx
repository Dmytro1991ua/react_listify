import { renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';

import { useSelectProductItem } from './useSelectProductItem';
import { UpdateShoppingListItemActionPayload } from '../../../app.interfaces';
import { COMMON_DEFAULT_FORMIK_INSTANCE, defaultShoppingListItems } from '../../../mocks/test-mocks';
import * as shoppingListDetailsActions from '../shopping-list-details.actions';

const defaultProps = {
  shoppingListId: '1',
  shoppingListItems: defaultShoppingListItems,
};

describe('useShoppingListsModal', () => {
  let shoppingListDetailsEditActionsSpy: SpyInstance<[payload: UpdateShoppingListItemActionPayload], Promise<void>>;

  beforeEach(() => {
    vi.resetAllMocks();
    shoppingListDetailsEditActionsSpy = vi.spyOn(shoppingListDetailsActions, 'updateShoppingListItemAction');
  });

  const hook = renderHook(() => useSelectProductItem(defaultProps), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  it('should call onSelectProductItem method', () => {
    const { result } = hook;

    expect(result.current.onSelectProductItem('1')).rejects.toThrow();

    expect(shoppingListDetailsEditActionsSpy).toHaveBeenCalled();
  });
});
