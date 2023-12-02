import { Form, FormikProvider } from 'formik';
import { ReactElement } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { InputDivider, ModalInput, ModalSelect } from './edit-product-item-modal.styled';
import { EditProductItemFormInitialValues } from './edit-product-item.modal.interfaces';
import { ProductUnits } from '../../../../app.enums';
import { CommonModalProps } from '../../../../app.interfaces';
import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import Modal from '../../../../shared/components/modal/modal';

const EditProductItemModal = ({
  formikInstance,
  open,
  title,
  primaryBtnLabel,
  secondaryBtnLabel,
  isLoading,
  loader,
  fullWidth,
  options,
  onClose,
  onSubmit,
  isDirty,
}: CommonModalProps<EditProductItemFormInitialValues>): ReactElement => {
  return (
    <Modal
      fullWidth={fullWidth}
      isDirty={isDirty}
      open={open}
      primaryBtnLabel={primaryBtnLabel}
      secondaryBtnLabel={secondaryBtnLabel}
      title={title}
      onClose={onClose}
      onSubmit={onSubmit}>
      <FormikProvider value={formikInstance}>
        <Form>
          {isLoading ? (
            loader
          ) : (
            <>
              <InputDivider>
                <FormikInput autoFocus fullWidth id='name' name='name' placeholder='Enter product name' />
              </InputDivider>
              <InputDivider>
                <ModalInput
                  fullWidth
                  id='quantity'
                  maxValue={1000}
                  minValue={0}
                  name='quantity'
                  placeholder='Enter product quantity'
                  type='number'
                  value={formikInstance.values.quantity}
                  onChange={(e) => formikInstance.setFieldValue('quantity', e.target.value)}
                />
              </InputDivider>
              <InputDivider>
                <ModalSelect
                  fullWidth
                  icon={IoMdArrowDropdown}
                  label='Choose product unit'
                  name='unit'
                  options={options ?? []}
                  value={formikInstance.values.unit ?? ProductUnits.Default}
                  onChange={(e) => formikInstance.setFieldValue('unit', e.target.value)}
                />
              </InputDivider>
              <InputDivider>
                <ModalInput
                  fullWidth
                  id='price'
                  maxValue={1000}
                  minValue={0}
                  name='price'
                  placeholder='Enter product price'
                  type='number'
                  value={formikInstance.values.price}
                  onChange={(e) => formikInstance.setFieldValue('price', e.target.value)}
                />
              </InputDivider>
            </>
          )}
        </Form>
      </FormikProvider>
    </Modal>
  );
};

export default EditProductItemModal;
