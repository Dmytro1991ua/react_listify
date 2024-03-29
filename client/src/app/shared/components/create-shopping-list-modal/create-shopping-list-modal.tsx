import { Form, FormikProvider } from 'formik';
import { ReactElement } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { CurrenciesSelect } from './create-shopping-list-modal.styled';
import { Currencies } from '../../../app.enums';
import { CommonModalProps } from '../../../app.interfaces';
import { CreateShoppingListFromInitialValues } from '../../../modules/shopping-lists/shopping-lists.interfaces';
import FormikInput from '../input/formik-input/formik-input';
import Modal from '../modal/modal';

const CreateShoppingListModal = ({
  formikInstance,
  open,
  title,
  primaryBtnLabel,
  secondaryBtnLabel,
  fullWidth,
  options,
  isLoading,
  loader,
  isShoppingList,
  onClose,
  onSubmit,
  isDirty,
}: CommonModalProps<CreateShoppingListFromInitialValues>): ReactElement => {
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
            <>
              <FormikInput autoFocus id='name' name='name' placeholder='Enter the name of the list' />
              {isShoppingList && options && (
                <CurrenciesSelect
                  fullWidth
                  icon={IoMdArrowDropdown}
                  isShoppingList={isShoppingList}
                  label='Select Currency'
                  name='currency'
                  options={options}
                  value={formikInstance.values.currency ?? Currencies.Dollar}
                  onChange={(e) => formikInstance.setFieldValue('currency', e.target.value)}
                />
              )}
            </>
          )}
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default CreateShoppingListModal;
