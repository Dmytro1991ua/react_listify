import { FormikProps } from 'formik';
import { ReactElement } from 'react';

import CreateShoppingListModal from '../../../../shared/components/create-shopping-list-modal/create-shopping-list-modal';
import { CreateShoppingListFromInitialValues } from '../../../shopping-lists/shopping-lists.interfaces';

interface CreateShoppingListCopyModalProps {
  formikInstance: FormikProps<CreateShoppingListFromInitialValues>;
  isModalOpen: boolean;
  title: string;
  onModalClose: () => void;
}

const CreateShoppingListCopyModal = ({
  formikInstance,
  isModalOpen,
  title,
  onModalClose,
}: CreateShoppingListCopyModalProps): ReactElement => {
  return (
    <CreateShoppingListModal
      fullWidth
      formikInstance={formikInstance}
      open={isModalOpen}
      primaryBtnLabel='Submit'
      secondaryBtnLabel='Close'
      title={title}
      onClose={onModalClose}
      onSubmit={formikInstance.submitForm}
    />
  );
};

export default CreateShoppingListCopyModal;
