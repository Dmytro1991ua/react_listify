import { ReactElement } from 'react';

import DeleteConfirmationModal from '../../../../shared/components/delete-confirmation-modal/delete-confirmation-modal';

interface DeleteProductItemModalPros {
  isModalOpen: boolean;
  onModalClose: () => void;
  onDelete: () => Promise<void>;
}

const DeleteProductItemModal = ({ isModalOpen, onModalClose, onDelete }: DeleteProductItemModalPros): ReactElement => {
  return (
    <DeleteConfirmationModal
      fullWidth
      open={isModalOpen}
      primaryBtnLabel='Yes'
      secondaryBtnLabel='No'
      title='Are you sure you want to delete it?'
      onClose={onModalClose}
      onSubmit={onDelete}
    />
  );
};

export default DeleteProductItemModal;
