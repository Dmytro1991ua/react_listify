import { ReactElement } from 'react';

import DeleteConfirmationModal from '../../../../shared/components/delete-confirmation-modal/delete-confirmation-modal';
import { deleteShoppingListItemAction } from '../../shopping-list-details.actions';

interface DeleteProductItemModalPros {
  shoppingListId: string;
  shoppingListItemId: string;
  isModalOpen: boolean;
  onModalClose: () => void;
}

const DeleteProductItemModal = ({
  shoppingListId,
  shoppingListItemId,
  isModalOpen,
  onModalClose,
}: DeleteProductItemModalPros): ReactElement => {
  async function handleProductItemDeletion(): Promise<void> {
    try {
      await deleteShoppingListItemAction(shoppingListId, shoppingListItemId);

      onModalClose();
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
      onClose={onModalClose}
      onSubmit={handleProductItemDeletion}
    />
  );
};

export default DeleteProductItemModal;
