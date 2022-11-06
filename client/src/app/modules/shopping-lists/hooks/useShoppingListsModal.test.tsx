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

const defaultProps = {
  formikInstance: COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance,
  shoppingListId: '1',
  setValidateAfterSubmit: vi.fn(),
};

describe('useShoppingListsModal', () => {
  let shoppingListCreateActionsSpy: SpyInstance<[shoppingList: ShoppingListData], Promise<void>>;
  let shoppingListDeleteActionSpy: SpyInstance<[id: string], Promise<void>>;

  beforeEach(() => {
    vi.resetAllMocks();

    shoppingListCreateActionsSpy = vi.spyOn(shoppingListsActions, 'createShoppingListAction');
    shoppingListDeleteActionSpy = vi.spyOn(shoppingListsActions, 'deleteShoppingListAction');
  });

  const hook = renderHook(() => useShoppingListsModal(defaultProps), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  it('should call onCreateShoppingListFormSubmit function and submit shopping list details', async () => {
    const { result } = hook;

    expect(
      result.current.onCreateShoppingListFormSubmit({ name: 'Test Shopping List', currency: Currencies.Dollar })
    ).rejects.toThrow();
    expect(result.current.onCloseCreateModal());

    await waitFor(() => expect(shoppingListCreateActionsSpy).toHaveBeenCalled());
  });

  it('should call onShoppingListDeletion function and  submit shopping list details deletion', async () => {
    const { result } = hook;

    expect(result.current.onShoppingListDeletion());
    expect(result.current.onOpenDeleteModal());

    expect(shoppingListDeleteActionSpy).toHaveBeenCalled();
  });

  it('should call onOpenCreateModal method', async () => {
    const { result, rerender } = hook;

    rerender();

    expect(result.current.isCreateModalOpen).toBe(false);

    act(() => result.current.onOpenCreateModal());

    expect(result.current.isCreateModalOpen).toBe(true);
  });

  it('should call onCloseCreateModal method', async () => {
    const { result, rerender } = hook;

    expect(result.current.isCreateModalOpen).toBe(true);

    act(() => result.current.onCloseCreateModal());

    rerender();

    expect(result.current.isCreateModalOpen).toBe(false);
    expect(defaultProps.formikInstance.resetForm).toHaveBeenCalled();
  });

  it('should call onCreateShoppingList method', async () => {
    const { result } = hook;

    act(() => result.current.onCreateShoppingList());

    expect(defaultProps.formikInstance.submitForm).toHaveBeenCalled();
  });

  it('should call onOpenDeleteModal method', async () => {
    const { result, rerender } = hook;

    rerender();

    expect(result.current.isDeleteModalOpen).toBe(false);

    act(() => result.current.onOpenDeleteModal());

    expect(result.current.isDeleteModalOpen).toBe(true);
  });

  it('should call onCloseDeleteModal method', async () => {
    const { result, rerender } = hook;

    expect(result.current.isDeleteModalOpen).toBe(true);

    act(() => result.current.onCloseDeleteModal());

    rerender();

    expect(result.current.isDeleteModalOpen).toBe(false);
  });
});
