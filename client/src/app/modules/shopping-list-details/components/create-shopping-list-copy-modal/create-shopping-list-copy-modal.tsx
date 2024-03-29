import { FormikProps } from 'formik';
import { ReactElement } from 'react';

import CreateShoppingListModal from '../../../../shared/components/create-shopping-list-modal/create-shopping-list-modal';
import { CreateShoppingListFromInitialValues } from '../../../shopping-lists/shopping-lists.interfaces';

interface CreateShoppingListCopyModalProps {
  formikInstance: FormikProps<CreateShoppingListFromInitialValues>;
  isModalOpen: boolean;
  title: string;
  isLoading: boolean;
  loader: JSX.Element;
  onModalClose: () => void;
}

const CreateShoppingListCopyModal = ({
  formikInstance,
  isModalOpen,
  title,
  isLoading,
  loader,
  onModalClose,
}: CreateShoppingListCopyModalProps): ReactElement => {
  return (
    <CreateShoppingListModal
      fullWidth
      formikInstance={formikInstance}
      isLoading={isLoading}
      loader={loader}
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
