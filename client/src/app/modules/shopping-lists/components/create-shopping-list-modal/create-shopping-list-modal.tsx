import { Form, FormikProps, FormikProvider } from 'formik';
import { ReactElement } from 'react';

import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import { CreateShoppingListFromInitialValues } from '../../shopping-lists.interfaces';
import Modal from './../../../../shared/components/modal/modal';

interface CreateShoppingListModalProps {
  formikInstance: FormikProps<CreateShoppingListFromInitialValues>;
  open: boolean;
  title?: string;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  fullWidth?: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
}

const CreateShoppingListModal = ({
  formikInstance,
  open,
  title,
  primaryBtnLabel,
  secondaryBtnLabel,
  fullWidth,
  onClose,
  onSubmit,
}: CreateShoppingListModalProps): ReactElement => {
  return (
    <Modal
      fullWidth={fullWidth}
      isDirty={!formikInstance.dirty}
      open={open}
      primaryBtnLabel={primaryBtnLabel}
      secondaryBtnLabel={secondaryBtnLabel}
      title={title}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <FormikProvider value={formikInstance}>
        <Form>
          <FormikInput id='name' name='name' placeholder='Enter the name of the list' />
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default CreateShoppingListModal;
