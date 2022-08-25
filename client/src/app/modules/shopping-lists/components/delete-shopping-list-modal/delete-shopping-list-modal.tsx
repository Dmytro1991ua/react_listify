import { ReactElement } from 'react';

import Modal from '../../../../shared/components/modal/modal';

interface DeleteShoppingListModalProps {
  open: boolean;
  title?: string;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  fullWidth?: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteShoppingListModal = ({
  open,
  title,
  primaryBtnLabel,
  secondaryBtnLabel,
  fullWidth,
  onClose,
  onSubmit,
}: DeleteShoppingListModalProps): ReactElement => {
  return (
    <Modal
      fullWidth={fullWidth}
      open={open}
      primaryBtnLabel={primaryBtnLabel}
      secondaryBtnLabel={secondaryBtnLabel}
      title={title}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default DeleteShoppingListModal;
