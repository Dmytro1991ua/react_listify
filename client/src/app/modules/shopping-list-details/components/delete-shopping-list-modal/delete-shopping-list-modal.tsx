import { ReactElement } from 'react';

import { AppRoutes } from '../../../../app.enums';
import history from '../../../../services/history.service';
import DeleteConfirmationModal from '../../../../shared/components/delete-confirmation-modal/delete-confirmation-modal';
import { useShoppingListsStore } from '../../../shopping-lists/shopping-lists.store';

interface DeleteShoppingListModalProps {
  shoppingListId: string;
  isModalOpen: boolean;
  onModalOpen: (value: boolean) => void;
}

const DeleteShoppingListModal = ({
  shoppingListId,
  isModalOpen,
  onModalOpen,
}: DeleteShoppingListModalProps): ReactElement => {
  const removeExistingShoppingList = useShoppingListsStore((state) => state.removeShoppingList);

  function handleCloseModal(): void {
    onModalOpen(false);
  }

  async function handleShoppingListDeletion(): Promise<void> {
    try {
      await removeExistingShoppingList(shoppingListId);

      history.push(AppRoutes.ShoppingLists);
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
      title='Are you sure you want to delete shopping list details?'
      onClose={handleCloseModal}
      onSubmit={handleShoppingListDeletion}
    />
  );
};

export default DeleteShoppingListModal;
