import { FormikProps, FormikProvider } from 'formik';
import { ReactElement } from 'react';

import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import { InputDivider } from '../../../shopping-list-details/components/edit-product-item-modall/edit-product-item-modal.styled';
import { ProfileFormsInitialValues } from '../../profile.interfaces';
import { FormWrapper, UserInformationForm } from './profile-user-information-fields.styled';

interface ProfileUserInformationFieldsProps {
  formikInstance: FormikProps<ProfileFormsInitialValues>;
  isUploading: boolean;
}

const ProfileUserInformationFields = ({
  formikInstance,
  isUploading,
}: ProfileUserInformationFieldsProps): ReactElement => {
  return (
    <FormikProvider value={formikInstance}>
      <FormWrapper>
        <UserInformationForm isUploading={isUploading}>
          <InputDivider>
            <FormikInput disabled fullWidth id='email' name='email' placeholder='Enter your email' />
          </InputDivider>
          <InputDivider>
            <FormikInput fullWidth id='name' name='name' placeholder='Enter your name' />
          </InputDivider>
        </UserInformationForm>
      </FormWrapper>
    </FormikProvider>
  );
};

export default ProfileUserInformationFields;
