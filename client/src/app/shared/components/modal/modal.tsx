import { ReactElement, ReactNode } from 'react';

import Button from '../button/button';
import {
  DialogActionsContainer,
  DialogCloseBtn,
  DialogCloseIcon,
  DialogContainer,
  DialogContent,
  DialogTitle,
} from './modal.styled';

interface ModalProps {
  /**
   * @param {boolean} open - Defines an opening/closing modal state
   * @default false
   * @example true/false
   */
  open: boolean;
  /**
   * @param {ReactNode} children - Defines a modal main content
   * @default undefined
   * @example
   *    <Modal>
   *      <form></form>
   *    </Modal>
   */
  children?: ReactNode;
  /**
   * @param {boolean} fullWidth - Defines the width of dialog actions container and buttons themselves
   * @default undefined
   * @example true
   */
  fullWidth?: boolean;
  /**
   * @param {string} title - Defines the modal main title
   * @default undefined
   * @example Edit Form
   */
  title?: string;
  /**
   * @param {string} primaryBtnLabel - Defines the label of the primary btn
   * @default Submit
   * @example Submit, Delete
   */
  primaryBtnLabel?: string;
  /**
   * @param {string} primaryBtnLabel - Defines the label of the secondary btn
   * @default Cancel
   * @example Cancel, Ok
   */
  secondaryBtnLabel?: string;
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
}

const Modal = ({
  open,
  children,
  fullWidth,
  primaryBtnLabel = 'Submit',
  secondaryBtnLabel = 'Cancel',
  title,
  onClose,
  onSubmit,
}: ModalProps): ReactElement => {
  return (
    <DialogContainer open={open} transitionDuration={{ enter: 0, exit: 0 }} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogCloseBtn variant='transparent' onClick={onClose}>
        <DialogCloseIcon />
      </DialogCloseBtn>
      <DialogContent>{children}</DialogContent>
      <DialogActionsContainer fullWidth={fullWidth}>
        <Button fullWidth variant='secondaryOutlined' onClick={onClose}>
          {secondaryBtnLabel}
        </Button>
        <Button fullWidth variant='primaryOutlined' onClick={onSubmit}>
          {primaryBtnLabel}
        </Button>
      </DialogActionsContainer>
    </DialogContainer>
  );
};

export default Modal;
