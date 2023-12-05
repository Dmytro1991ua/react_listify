import { ReactElement } from 'react';

import DeleteConfirmationModal from '../../../../shared/components/delete-confirmation-modal/delete-confirmation-modal';

interface DeleteProductItemModalPros {
  isModalOpen: boolean;
  title?: string;
  onModalClose: () => void;
  onDelete: () => Promise<void> | void;
}

const DeleteProductItemModal = ({
  isModalOpen,
  title = 'Are you sure you want to delete it?',
  onModalClose,
  onDelete,
}: DeleteProductItemModalPros): ReactElement => {
  return (
    <DeleteConfirmationModal
      fullWidth
      open={isModalOpen}
      primaryBtnLabel='Yes'
      secondaryBtnLabel='No'
      title={title}
      onClose={onModalClose}
      onSubmit={onDelete}
    />
  );
};

export default DeleteProductItemModal;
