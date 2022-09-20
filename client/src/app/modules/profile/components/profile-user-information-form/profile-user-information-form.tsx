import { FormikProps } from 'formik';
import { ReactElement } from 'react';

import { ContentWrapper } from '../../profile.styled';
import ProfileUserInformationFields from '../profile-user-information-fields/profile-user-information-fields';
import ProfileUserInformationImage from '../profile-user-information-image/profile-user-information-image';
import { ProfileUserInformationInitialValues } from './profile-user-information-form.interfaces';

interface ProfileUserInformationFormProps {
  formikInstance: FormikProps<ProfileUserInformationInitialValues>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileUserInformationForm = ({ formikInstance, onChange }: ProfileUserInformationFormProps): ReactElement => {
  return (
    <ContentWrapper>
      <ProfileUserInformationImage onChange={onChange} />
      <ProfileUserInformationFields formikInstance={formikInstance} />
    </ContentWrapper>
  );
};

export default ProfileUserInformationForm;
