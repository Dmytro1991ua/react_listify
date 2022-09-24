import { Form, FormikProps, FormikProvider } from 'formik';
import { ReactElement } from 'react';

import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import { InputDivider } from '../../../shopping-list-details/components/edit-product-item-modall/edit-product-item-modal.styled';
import { ProfileFormsInitialValues } from '../../profile.interfaces';

interface ProfileChangePasswordFieldsProps {
  formikInstance: FormikProps<ProfileFormsInitialValues>;
}

const ProfileChangePasswordFields = ({ formikInstance }: ProfileChangePasswordFieldsProps): ReactElement => {
  return (
    <FormikProvider value={formikInstance}>
      <Form>
        <InputDivider>
          <FormikInput
            fullWidth
            id='currentPassword'
            name='currentPassword'
            placeholder='Enter current password'
            type='password'
          />
        </InputDivider>
        <InputDivider>
          <FormikInput fullWidth id='newPassword' name='newPassword' placeholder='Enter new password' type='password' />
        </InputDivider>
        <InputDivider>
          <FormikInput
            fullWidth
            id='confirmPassword'
            name='confirmPassword'
            placeholder='Confirm new password'
            type='password'
          />
        </InputDivider>
      </Form>
    </FormikProvider>
  );
};

export default ProfileChangePasswordFields;
