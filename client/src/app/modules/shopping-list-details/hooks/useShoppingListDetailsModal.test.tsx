import { act, renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { useShoppingListDetailsModal } from './useShoppingListDetailsModal';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../mocks/test-mocks';

vi.doMock('axios');

const defaultProps = {
  formikEditFormInstance: COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance,
  formikCreateFormInstance: COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance,
  onSetShoppingListItemId: vi.fn(),
  onSetValidateAfterSubmit: vi.fn(),
};

describe('useShoppingListDetailsModal', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const hook = renderHook(() => useShoppingListDetailsModal(defaultProps), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  it('should call onOpenProductItemDeleteModal method', async () => {
    const { result, rerender } = hook;

    rerender();

    expect(result.current.isProductItemDeleteModalOpen).toBe(false);

    act(() => result.current.onOpenProductItemDeleteModal('1'));

    expect(result.current.isProductItemDeleteModalOpen).toBe(true);
    expect(defaultProps.onSetShoppingListItemId).toHaveBeenCalledWith('1');
  });

  it('should call onOpenProductItemEditModal method', async () => {
    const { result, rerender } = hook;

    rerender();

    expect(result.current.isProductItemEditModalOpen).toBe(false);

    act(() => result.current.onOpenProductItemEditModal('1'));

    expect(result.current.isProductItemEditModalOpen).toBe(true);
    expect(defaultProps.onSetShoppingListItemId).toHaveBeenCalledWith('1');
  });

  it('should call onOpenShoppingListDeleteModal method', async () => {
    const { result, rerender } = hook;

    rerender();

    expect(result.current.isShoppingListDeleteModalOpen).toBe(false);

    act(() => result.current.onOpenShoppingListDeleteModal());

    expect(result.current.isShoppingListDeleteModalOpen).toBe(true);
  });

  it('should call onOpenCreateShoppingListModal method', async () => {
    const { result, rerender } = hook;

    rerender();

    expect(result.current.isCreateShoppingListModalOpen).toBe(false);

    act(() => result.current.onOpenCreateShoppingListModal());

    expect(result.current.isCreateShoppingListModalOpen).toBe(true);
  });

  it('should call onCloseShoppingListDeleteModal method', async () => {
    const { result, rerender } = hook;

    expect(result.current.isShoppingListDeleteModalOpen).toBe(true);

    act(() => result.current.onCloseShoppingListDeleteModal());

    rerender();

    expect(result.current.isShoppingListDeleteModalOpen).toBe(false);
  });

  it('should call onCloseCreateShoppingListModal method', async () => {
    const { result, rerender } = hook;

    expect(result.current.isCreateShoppingListModalOpen).toBe(true);

    act(() => result.current.onCloseCreateShoppingListModal());

    rerender();

    expect(result.current.isCreateShoppingListModalOpen).toBe(false);
    expect(defaultProps.formikCreateFormInstance.resetForm).toHaveBeenCalled();
  });

  it('should call onCloseProductItemEditModal method', async () => {
    const { result, rerender } = hook;

    expect(result.current.isProductItemEditModalOpen).toBe(true);

    act(() => result.current.onCloseProductItemEditModal());

    rerender();

    expect(result.current.isProductItemEditModalOpen).toBe(false);
    expect(defaultProps.onSetValidateAfterSubmit).toHaveBeenCalled();
  });

  it('should call onCloseProductItemDeleteModal method', async () => {
    const { result, rerender } = hook;

    act(() => result.current.onCloseProductItemDeleteModal());

    rerender();

    expect(result.current.isProductItemDeleteModalOpen).toBe(false);
  });

  it('should call onEditProductItem method', async () => {
    const { result, rerender } = hook;

    act(() => result.current.onEditProductItem());

    rerender();

    expect(result.current.isProductItemEditModalOpen).toBe(false);
    expect(defaultProps.formikEditFormInstance.submitForm).toHaveBeenCalled();
  });
});
