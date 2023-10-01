import { FormikProps } from 'formik';
import { useCallback, useState } from 'react';

import { Currencies } from '../../../app.enums';
import { ShoppingListData } from '../../../app.interfaces';
import { EditShoppingListFormInitialValues } from '../components/edit-shopping-list-modal/edit-shopping-list.modal.interfaces';
import {
  createShoppingListAction,
  deleteShoppingListAction,
  updateShoppingListAction,
} from '../shopping-lists.actions';
import { CreateShoppingListFromInitialValues } from '../shopping-lists.interfaces';
import { useShoppingListsStore } from '../shopping-lists.store';

type HookProps = {
  setValidateAfterSubmit: (value: boolean) => void;
  shoppingListId: string;
  formikInstance: FormikProps<CreateShoppingListFromInitialValues>;
  formikEditFormInstance: FormikProps<EditShoppingListFormInitialValues>;
};

type ReturnedHookType = {
  isCreateModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  onEditShoppingList: () => void;
  onCloseEditModal: () => void;
  onOpenEditModal: () => void;
  onOpenCreateModal: () => void;
  onCloseCreateModal: () => void;
  onOpenDeleteModal: () => void;
  onCloseDeleteModal: () => void;
  onCreateShoppingList: () => void;
  onShoppingListDeletion: () => Promise<void>;
  onCreateShoppingListFormSubmit: (values: CreateShoppingListFromInitialValues) => Promise<void>;
  onEditShoppingListFormSubmit: (values: EditShoppingListFormInitialValues) => Promise<void>;
};

export const useShoppingListsModal = ({
  formikInstance,
  formikEditFormInstance,
  shoppingListId,
  setValidateAfterSubmit,
}: HookProps): ReturnedHookType => {
  const shoppingList = useShoppingListsStore((state) => state.shoppingList);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const onOpenCreateModal = useCallback((): void => {
    setIsCreateModalOpen(true);
  }, []);

  const onCloseCreateModal = useCallback((): void => {
    setIsCreateModalOpen(false);
    setValidateAfterSubmit(false);

    formikInstance.resetForm();
  }, [formikInstance, setValidateAfterSubmit]);

  const onCreateShoppingList = useCallback((): void => {
    setValidateAfterSubmit(true);
    formikInstance.submitForm();
  }, [formikInstance, setValidateAfterSubmit]);

  const onOpenDeleteModal = useCallback((): void => {
    setIsDeleteModalOpen(true);
  }, []);

  const onCloseDeleteModal = useCallback((): void => {
    setIsDeleteModalOpen(false);
  }, []);

  const onOpenEditModal = useCallback((): void => {
    setIsEditModalOpen(true);
  }, []);

  const onCloseEditModal = useCallback((): void => {
    setIsEditModalOpen(false);
    setValidateAfterSubmit(false);
  }, [setValidateAfterSubmit]);

  const onEditShoppingList = useCallback((): void => {
    setValidateAfterSubmit(true);

    formikEditFormInstance.submitForm();
  }, [formikEditFormInstance, setValidateAfterSubmit]);

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

  async function onEditShoppingListFormSubmit(values: EditShoppingListFormInitialValues): Promise<void> {
    try {
      const { name } = values;

      await updateShoppingListAction({
        shoppingListData: { name },
        shoppingListId,
      });

      onCloseEditModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  return {
    isCreateModalOpen,
    isDeleteModalOpen,
    isEditModalOpen,
    onEditShoppingList,
    onOpenEditModal,
    onCloseEditModal,
    onOpenCreateModal,
    onCloseCreateModal,
    onCreateShoppingList,
    onShoppingListDeletion,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onCreateShoppingListFormSubmit,
    onEditShoppingListFormSubmit,
  };
};
