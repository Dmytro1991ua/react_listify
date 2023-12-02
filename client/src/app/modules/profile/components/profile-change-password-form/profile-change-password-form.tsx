import { FormikProps } from 'formik';
import { ReactElement } from 'react';

import ProfileChangePasswordFields from './../profile-change-password-fields/profile-change-password-fields';
import { ProfileFormsInitialValues } from '../../profile.interfaces';
import { CommonFormWrapper } from '../../profile.styled';

interface ProfileChangePasswordFieldsProps {
  formikInstance: FormikProps<ProfileFormsInitialValues>;
}

const ProfileChangePasswordForm = ({ formikInstance }: ProfileChangePasswordFieldsProps): ReactElement => {
  return (
    <CommonFormWrapper>
      <ProfileChangePasswordFields formikInstance={formikInstance} />
    </CommonFormWrapper>
  );
};

export default ProfileChangePasswordForm;
