import { Form, FormikProps, FormikProvider } from 'formik';
import { ReactElement } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { CreateShoppingListFromInitialValues } from '../../../modules/shopping-lists/shopping-lists.interfaces';
import FormikInput from '../input/formik-input/formik-input';
import Modal from '../modal/modal';
import { DropdownOption } from '../select/select.interfaces';
import { CurrenciesSelect } from './create-shopping-list-modal.styled';

interface CreateShoppingListModalProps {
  formikInstance: FormikProps<CreateShoppingListFromInitialValues>;
  open: boolean;
  title?: string;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  fullWidth?: boolean;
  isDirty?: boolean;
  isShoppingList?: boolean;
  options?: DropdownOption<string>[];
  onClose: () => void;
  onSelectChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void> | void;
}

const CreateShoppingListModal = ({
  formikInstance,
  open,
  title,
  primaryBtnLabel,
  secondaryBtnLabel,
  fullWidth,
  options,
  isShoppingList,
  onClose,
  onSelectChange,
  onSubmit,
  isDirty,
}: CreateShoppingListModalProps): ReactElement => {
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
          <FormikInput autoFocus id='name' name='name' placeholder='Enter the name of the list' />
          {isShoppingList && options && onSelectChange && (
            <CurrenciesSelect
              fullWidth
              icon={IoMdArrowDropdown}
              isShoppingList={isShoppingList}
              label='Select Currency'
              options={options}
              value={formikInstance.values.currency ?? ''}
              onChange={onSelectChange}
            />
          )}
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default CreateShoppingListModal;
