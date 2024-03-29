import { ReactElement, ReactNode } from 'react';

import {
  DialogActionsContainer,
  DialogCloseBtn,
  DialogCloseIcon,
  DialogContainer,
  DialogContent,
  DialogTitle,
} from './modal.styled';
import Button from '../button/button';

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
   * @default undefined
   * @example Submit, Delete
   */
  primaryBtnLabel?: string;
  /**
   * @param {string} primaryBtnLabel - Defines the label of the secondary btn
   * @default undefined
   * @example Cancel, Ok
   */
  secondaryBtnLabel?: string;
  /**
   * @param {boolean} isDirty Defines if a specific form field was touched
   * @default undefined,
   * @example true/false
   */
  isDirty?: boolean;
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
  isDirty,
  onClose,
  onSubmit,
}: ModalProps): ReactElement => {
  return (
    <DialogContainer open={open} transitionDuration={{ enter: 0, exit: 0 }} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogCloseBtn ariaLabel='close-btn' variant='transparent' onClick={onClose}>
        <DialogCloseIcon />
      </DialogCloseBtn>
      <DialogContent>{children}</DialogContent>
      <DialogActionsContainer fullWidth={fullWidth}>
        <Button fullWidth variant='secondaryOutlined' onClick={onClose}>
          {secondaryBtnLabel}
        </Button>
        <Button fullWidth disabled={isDirty} type='submit' variant='primaryOutlined' onClick={onSubmit}>
          {primaryBtnLabel}
        </Button>
      </DialogActionsContainer>
    </DialogContainer>
  );
};

export default Modal;
