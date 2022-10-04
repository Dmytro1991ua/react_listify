import _ from 'lodash';
import { useMemo, useRef, useState } from 'react';

import { ProductUnits } from '../../../app.enums';
import { ShoppingListItem } from '../../../app.interfaces';
import { useShoppingListsStore } from '../../shopping-lists/shopping-lists.store';
import { EditProductItemFormInitialValues } from '../components/edit-product-item-modall/edit-product-item.modal.interfaces';
import { createShoppingListItemAction, editShoppingListItemAction } from '../shopping-list-details.actions';

type HookProps = {
  shoppingListId: string;
  shoppingListItemId: string;
  shoppingListItems: ShoppingListItem[];
  onSetValidateAfterSubmit: (value: boolean) => void;
  onCloseModal: () => void;
};

type ReturnedHookType = {
  inputRef: React.RefObject<HTMLInputElement>;
  onAddNewProduct: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCreateProductItemFormSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onEditProductItemFormSubmit: (values: EditProductItemFormInitialValues) => Promise<void>;
};

export const useCreateAndEditProductItem = ({
  shoppingListId,
  shoppingListItemId,
  shoppingListItems,
  onCloseModal,
  onSetValidateAfterSubmit,
}: HookProps): ReturnedHookType => {
  const shoppingListItem = useShoppingListsStore((state) => state.shoppingListItem);

  const [newProductItem, setNewProductItem] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedInputValue = useMemo(() => _.debounce((value) => setNewProductItem(value), 300), []);

  function onAddNewProduct(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    debouncedInputValue(e.target.value);
  }

  function handleClearInput(): void {
    if (inputRef.current) {
      inputRef.current.value = '';
      setNewProductItem('');
    }
  }

  async function onCreateProductItemFormSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    try {
      e.preventDefault();

      const payload: ShoppingListItem = {
        ...shoppingListItem,
        name: newProductItem,
      };

      if (newProductItem) {
        await createShoppingListItemAction(shoppingListId, payload);
      }

      handleClearInput();
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

      await editShoppingListItemAction(shoppingListId, payload);
      onCloseModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  return { inputRef, onAddNewProduct, onCreateProductItemFormSubmit, onEditProductItemFormSubmit };
};
