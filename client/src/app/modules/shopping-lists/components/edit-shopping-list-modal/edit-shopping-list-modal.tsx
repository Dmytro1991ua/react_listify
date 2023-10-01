import { Form, FormikProvider } from 'formik';
import { ReactElement } from 'react';

import { CommonModalProps } from '../../../../app.interfaces';
import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import Modal from '../../../../shared/components/modal/modal';
import { EditShoppingListFormInitialValues } from './edit-shopping-list.modal.interfaces';

const EditShoppingListModal = ({
  formikInstance,
  open,
  title,
  primaryBtnLabel,
  secondaryBtnLabel,
  fullWidth,
  isLoading,
  loader,
  onClose,
  onSubmit,
  isDirty,
}: CommonModalProps<EditShoppingListFormInitialValues>): ReactElement => {
  return (
    <Modal
      fullWidth={fullWidth}
      isDirty={isDirty}
      open={open}
      primaryBtnLabel={primaryBtnLabel}
      secondaryBtnLabel={secondaryBtnLabel}
      title={title}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <FormikProvider value={formikInstance}>
        <Form>
          {isLoading ? (
            loader
          ) : (
            <FormikInput autoFocus fullWidth id='name' name='name' placeholder='Enter shopping list name' />
          )}
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default EditShoppingListModal;
