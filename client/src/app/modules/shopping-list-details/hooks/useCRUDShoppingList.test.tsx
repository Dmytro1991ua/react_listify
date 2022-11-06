import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';

import { Currencies } from '../../../app.enums';
import { ShoppingListData } from '../../../app.interfaces';
import { COMMON_DEFAULT_FORMIK_INSTANCE, defaultShoppingListItems } from '../../../mocks/test-mocks';
import * as shoppingListsActions from '../../shopping-lists/shopping-lists.actions';
import { useCRUDShoppingList } from './useCRUDShoppingList';

const defaultProps = {
  currency: Currencies.Dollar,
  shoppingListItems: defaultShoppingListItems,
  shoppingListId: '1',
  onCloseModal: vi.fn(),
};

describe('useShoppingListsModal', () => {
  let shoppingListCreateActionsSpy: SpyInstance<[shoppingList: ShoppingListData], Promise<void>>;
  let shoppingListDeleteActionSpy: SpyInstance<[id: string], Promise<void>>;

  beforeEach(() => {
    vi.resetAllMocks();

    shoppingListCreateActionsSpy = vi.spyOn(shoppingListsActions, 'createShoppingListAction');
    shoppingListDeleteActionSpy = vi.spyOn(shoppingListsActions, 'deleteShoppingListAction');
  });

  const hook = renderHook(() => useCRUDShoppingList(defaultProps), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  it('should call onCreateShoppingListCopy function and submit shopping list details', async () => {
    const { result } = hook;

    expect(
      result.current.onCreateShoppingListCopy({ name: 'Test Shopping List', currency: Currencies.Dollar })
    ).rejects.toThrow();

    await waitFor(() => expect(shoppingListCreateActionsSpy).toHaveBeenCalled());
  });

  it('should call onShoppingListDeletion function and  submit shopping list details deletion', async () => {
    const { result } = hook;

    expect(result.current.onShoppingListDeletion());

    expect(shoppingListDeleteActionSpy).toHaveBeenCalled();
  });
});
