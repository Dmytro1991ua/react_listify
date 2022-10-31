import { ReactElement } from 'react';

import DeleteConfirmationModal from '../../../../shared/components/delete-confirmation-modal/delete-confirmation-modal';

interface DeleteShoppingListModalProps {
  isModalOpen: boolean;
  onModalClose: () => void;
  onSubmit: () => Promise<void>;
}

const DeleteShoppingListModal = ({
  isModalOpen,
  onModalClose,
  onSubmit,
}: DeleteShoppingListModalProps): ReactElement => {
  return (
    <DeleteConfirmationModal
      fullWidth
      open={isModalOpen}
      primaryBtnLabel='Yes'
      secondaryBtnLabel='No'
      title='Are you sure you want to delete shopping list with details?'
      onClose={onModalClose}
      onSubmit={onSubmit}
    />
  );
};

export default DeleteShoppingListModal;
