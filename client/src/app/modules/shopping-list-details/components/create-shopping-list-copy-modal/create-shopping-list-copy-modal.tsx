import { FormikProps } from 'formik';
import { ReactElement } from 'react';

import CreateShoppingListModal from '../../../shopping-lists/components/create-shopping-list-modal/create-shopping-list-modal';
import { CreateShoppingListFromInitialValues } from '../../../shopping-lists/shopping-lists.interfaces';

interface CreateShoppingListCopyModalProps {
  formikInstance: FormikProps<CreateShoppingListFromInitialValues>;
  isModalOpen: boolean;
  onModalOpen: (value: boolean) => void;
}

const CreateShoppingListCopyModal = ({
  formikInstance,
  isModalOpen,
  onModalOpen,
}: CreateShoppingListCopyModalProps): ReactElement => {
  function handleCloseModal(): void {
    onModalOpen(false);

    formikInstance.resetForm();
  }

  return (
    <CreateShoppingListModal
      fullWidth
      formikInstance={formikInstance}
      open={isModalOpen}
      primaryBtnLabel='Submit'
      secondaryBtnLabel='Close'
      title='Create a List'
      onClose={handleCloseModal}
      onSubmit={formikInstance.submitForm}
    />
  );
};

export default CreateShoppingListCopyModal;
