import { FormikProps } from 'formik';
import { useState } from 'react';

import { Currencies } from '../../../app.enums';
import { ShoppingListData } from '../../../app.interfaces';
import { createShoppingListAction, deleteShoppingListAction } from '../shopping-lists.actions';
import { CreateShoppingListFromInitialValues } from '../shopping-lists.interfaces';
import { useShoppingListsStore } from '../shopping-lists.store';

type HookProps = {
  setValidateAfterSubmit: (value: boolean) => void;
  shoppingListId: string;
  formikInstance: FormikProps<CreateShoppingListFromInitialValues>;
};

type ReturnedHookType = {
  isCreateModalOpen: boolean;
  isDeleteModalOpen: boolean;
  onOpenCreateModal: () => void;
  onCloseCreateModal: () => void;
  onOpenDeleteModal: () => void;
  onCloseDeleteModal: () => void;
  onCreateShoppingList: () => void;
  onShoppingListDeletion: () => Promise<void>;
  onCreateShoppingListFormSubmit: (values: CreateShoppingListFromInitialValues) => Promise<void>;
};

export const useShoppingListModal = ({
  formikInstance,
  shoppingListId,
  setValidateAfterSubmit,
}: HookProps): ReturnedHookType => {
  const shoppingList = useShoppingListsStore((state) => state.shoppingList);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function onOpenCreateModal(): void {
    setIsCreateModalOpen(true);
  }

  function onCloseCreateModal(): void {
    setIsCreateModalOpen(false);
    setValidateAfterSubmit(false);

    formikInstance.resetForm();
  }

  function onCreateShoppingList(): void {
    setValidateAfterSubmit(true);
    formikInstance.submitForm();
  }

  function onOpenDeleteModal(): void {
    setIsDeleteModalOpen(true);
  }

  function onCloseDeleteModal(): void {
    setIsDeleteModalOpen(false);
  }

  async function onShoppingListDeletion(): Promise<void> {
    try {
      await deleteShoppingListAction(shoppingListId);
      onCloseDeleteModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async function onCreateShoppingListFormSubmit(values: CreateShoppingListFromInitialValues): Promise<void> {
    try {
      const payload: ShoppingListData = {
        ...shoppingList,
        name: values.name,
        currency: values.currency ?? Currencies.Default,
      };

      await createShoppingListAction(payload);
      onCloseCreateModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  return {
    isCreateModalOpen,
    isDeleteModalOpen,
    onOpenCreateModal,
    onCloseCreateModal,
    onCreateShoppingList,
    onShoppingListDeletion,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onCreateShoppingListFormSubmit,
  };
};
