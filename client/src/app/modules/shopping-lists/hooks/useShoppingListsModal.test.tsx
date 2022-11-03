import { waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';

import { Currencies } from '../../../app.enums';
import { ShoppingListData } from '../../../app.interfaces';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../mocks/test-mocks';
import * as shoppingListsActions from '../shopping-lists.actions';
import { useShoppingListsModal } from './useShoppingListsModal';

vi.doMock('axios');

describe('useShoppingListsModal.', () => {
  let shoppingListCreateActionsSpy: SpyInstance<[shoppingList: ShoppingListData], Promise<void>>;
  let shoppingListDeleteActionSpy: SpyInstance<[id: string], Promise<void>>;

  beforeEach(() => {
    vi.resetAllMocks();
    shoppingListCreateActionsSpy = vi.spyOn(shoppingListsActions, 'createShoppingListAction');
    shoppingListDeleteActionSpy = vi.spyOn(shoppingListsActions, 'deleteShoppingListAction');
  });

  const hook = renderHook(
    () =>
      useShoppingListsModal({
        formikInstance: COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance,
        shoppingListId: '1',
        setValidateAfterSubmit: vi.fn(),
      }),
    {
      wrapper: ({ children }) => (
        <MemoryRouter>
          <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
        </MemoryRouter>
      ),
    }
  );

  it('should call onSignInFormSubmit function and submit shopping list details', async () => {
    const { result } = hook;

    expect(
      result.current.onCreateShoppingListFormSubmit({ name: 'Test Shopping List', currency: Currencies.Dollar })
    ).rejects.toThrow();
    expect(result.current.onCloseCreateModal());

    await waitFor(() => expect(shoppingListCreateActionsSpy).toHaveBeenCalled());
  });

  it('should call onShoppingListDeletion function and  submit shopping list details deletion', async () => {
    const { result } = hook;

    await act(async () => result.current.onShoppingListDeletion());
    await act(async () => result.current.onOpenDeleteModal());

    expect(shoppingListDeleteActionSpy).toHaveBeenCalled();
  });
});
