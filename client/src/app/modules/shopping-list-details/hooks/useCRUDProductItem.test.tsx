import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';

import { ProductUnits } from '../../../app.enums';
import { UpdateShoppingListItemActionPayload } from '../../../app.interfaces';
import { COMMON_DEFAULT_FORMIK_INSTANCE, defaultShoppingListItems } from '../../../mocks/test-mocks';
import * as shoppingListDetailsActions from '../shopping-list-details.actions';
import { useCRUDProductItem } from './useCRUDProductItem';

const defaultProps = {
  shoppingListId: '1',
  shoppingListItemId: '2',
  shoppingListItems: defaultShoppingListItems,
  onSetValidateAfterSubmit: vi.fn(),
  onCloseModal: vi.fn(),
  onCloseDeleteModal: vi.fn(),
};

describe('useCRUDProductItem', () => {
  let shoppingListDetailsEditActionsSpy: SpyInstance<[payload: UpdateShoppingListItemActionPayload], Promise<void>>;
  let shoppingListDetailsDeleteActionsSpy: SpyInstance<[id: string, productItemId: string], Promise<void>>;

  beforeEach(() => {
    vi.resetAllMocks();

    shoppingListDetailsEditActionsSpy = vi.spyOn(shoppingListDetailsActions, 'updateShoppingListItemAction');
    shoppingListDetailsDeleteActionsSpy = vi.spyOn(shoppingListDetailsActions, 'deleteShoppingListItemAction');
  });

  const hook = renderHook(() => useCRUDProductItem(defaultProps), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  it('should call onEditProductItemFormSubmit function and submit product items details', async () => {
    const { result } = hook;

    expect(
      result.current.onEditProductItemFormSubmit({
        name: 'Test Edited Product Item',
        price: 10,
        quantity: 2,
        unit: ProductUnits.Kilogram,
      })
    ).rejects.toThrow();

    await waitFor(() => expect(shoppingListDetailsEditActionsSpy).toHaveBeenCalled());
  });

  it('should call onCreateProductItemFormSubmit function and submit product details', async () => {
    const { result } = hook;

    expect(result.current.onCreateProductItemFormSubmit());

    await waitFor(() => expect(shoppingListDetailsEditActionsSpy).toHaveBeenCalled());
  });

  it('should call onShoppingListDeletion function and  submit shopping list details deletion', async () => {
    const { result } = hook;

    expect(result.current.onProductItemDeletion());

    expect(shoppingListDetailsDeleteActionsSpy).toHaveBeenCalled();
  });

  it('should call onAddNewProduct method', async () => {
    const { result } = hook;

    expect(result.current.onAddNewProduct('Test product item'));
  });
});
