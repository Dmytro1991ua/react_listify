import { ReactElement } from 'react';

import DeleteConfirmationModal from '../../../../shared/components/delete-confirmation-modal/delete-confirmation-modal';
import { useShoppingListsStore } from '../../../shopping-lists/shopping-lists.store';

interface DeleteProductItemModalPros {
  shoppingListId: string;
  shoppingListItemId: string;
  isModalOpen: boolean;
  onModalOpen: (value: boolean) => void;
}

const DeleteProductItemModal = ({
  shoppingListId,
  shoppingListItemId,
  isModalOpen,
  onModalOpen,
}: DeleteProductItemModalPros): ReactElement => {
  const removeExistingShoppingListItem = useShoppingListsStore((state) => state.removeShoppingListItem);

  function handleCloseModal(): void {
    onModalOpen(false);
  }

  async function handleProductItemDeletion(): Promise<void> {
    try {
      await removeExistingShoppingListItem(shoppingListId, shoppingListItemId);

      handleCloseModal();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  return (
    <DeleteConfirmationModal
      fullWidth
      open={isModalOpen}
      primaryBtnLabel='Yes'
      secondaryBtnLabel='No'
      title='Are you sure you want to delete it?'
      onClose={handleCloseModal}
      onSubmit={handleProductItemDeletion}
    />
  );
};

export default DeleteProductItemModal;
