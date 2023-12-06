import _ from 'lodash';
import { useMemo, useRef, useState } from 'react';

import { ProductUnits } from '../../../app.enums';
import { ShoppingListItem } from '../../../app.interfaces';
import { useShoppingListsStore } from '../../shopping-lists/shopping-lists.store';
import { EditProductItemFormInitialValues } from '../components/edit-product-item-modall/edit-product-item.modal.interfaces';
import {
  deleteAllSelectedShoppingListItemsAction,
  deleteShoppingListItemAction,
  updateShoppingListItemAction,
} from '../shopping-list-details.actions';
import {
  FAILED_CREATE_SHOPPING_LIST_ITEM,
  FAILED_EDIT_SHOPPING_LIST_ITEM,
  SUCCESSFUL_CREATE_SHOPPING_LIST_ITEM,
  SUCCESSFUL_EDIT_SHOPPING_LIST_ITEM,
} from '../shopping-list-details.constants';
import { shoppingListDetailsService } from '../shopping-list-details.service';

type HookProps = {
  shoppingListId: string;
  shoppingListItemId: string;
  shoppingListItems: ShoppingListItem[];
  onSetValidateAfterSubmit: (value: boolean) => void;
  onCloseModal: () => void;
  onCloseDeleteModal: () => void;
};

type ReturnedHookType = {
  inputRef: React.RefObject<HTMLInputElement>;
  newProductItem: string;
  onAddNewProduct: (value: string) => void;
  onCreateProductItemFormSubmit: () => Promise<void>;
  onEditProductItemFormSubmit: (values: EditProductItemFormInitialValues) => Promise<void>;
  onProductItemDeletion: () => Promise<void>;
  onDeleteAllSelectedProductItems: () => Promise<void>;
};

export const useCRUDProductItem = ({
  shoppingListId,
  shoppingListItemId,
  shoppingListItems,
  onCloseModal,
  onCloseDeleteModal,
  onSetValidateAfterSubmit,
}: HookProps): ReturnedHookType => {
  const shoppingListItem = useShoppingListsStore((state) => state.shoppingListItem);

  const [newProductItem, setNewProductItem] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedInputValue = useMemo(() => _.debounce((value) => setNewProductItem(value), 300), []);

  function onAddNewProduct(value: string): void {
    debouncedInputValue(value);
  }

  function onHandleClearInput(): void {
    if (inputRef.current) {
      inputRef.current.value = '';
      setNewProductItem('');
    }
  }

  async function onCreateProductItemFormSubmit(): Promise<void> {
    try {
      const payload: ShoppingListItem = {
        ...shoppingListItem,
        name: newProductItem,
      };

      await updateShoppingListItemAction({
        shoppingListItem: payload,
        url: `/api/shopping-lists/${shoppingListId}/create-product-item`,
        serviceMethod: shoppingListDetailsService.updateShoppingListItem,
        successMessage: SUCCESSFUL_CREATE_SHOPPING_LIST_ITEM,
        failedMessage: FAILED_CREATE_SHOPPING_LIST_ITEM,
      });

      onHandleClearInput();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function onEditProductItemFormSubmit(values: EditProductItemFormInitialValues): Promise<void> {
    try {
      onSetValidateAfterSubmit(true);

      const editedProductItem = shoppingListItems.find((item) => item._id === shoppingListItemId) ?? null;

      const payload: ShoppingListItem = {
        ...editedProductItem,
        name: values.name,
        quantity: Number(values.quantity) ?? 0,
        units: values.unit ? values.unit : ProductUnits.Default,
        price: Number(values.price) ?? 0,
      };

      await updateShoppingListItemAction({
        shoppingListItem: payload,
        url: `/api/shopping-lists/${shoppingListId}/edit-product-item`,
        serviceMethod: shoppingListDetailsService.updateShoppingListItem,
        successMessage: SUCCESSFUL_EDIT_SHOPPING_LIST_ITEM,
        failedMessage: FAILED_EDIT_SHOPPING_LIST_ITEM,
      });
      onCloseModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function onProductItemDeletion(): Promise<void> {
    try {
      await deleteShoppingListItemAction(shoppingListId, shoppingListItemId);

      onCloseDeleteModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function onDeleteAllSelectedProductItems(): Promise<void> {
    try {
      await deleteAllSelectedShoppingListItemsAction(shoppingListId);
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  return {
    inputRef,
    newProductItem,
    onAddNewProduct,
    onCreateProductItemFormSubmit,
    onEditProductItemFormSubmit,
    onProductItemDeletion,
    onDeleteAllSelectedProductItems,
  };
};
