import { FormikProps } from 'formik';
import { ReactElement } from 'react';

import { ProfileFormsInitialValues } from '../../profile.interfaces';
import { ContentWrapper } from '../../profile.styled';
import ProfileUserInformationFields from '../profile-user-information-fields/profile-user-information-fields';
import ProfileUserInformationImage from '../profile-user-information-image/profile-user-information-image';

interface ProfileUserInformationFormProps {
  formikInstance: FormikProps<ProfileFormsInitialValues>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileUserInformationForm = ({ formikInstance, onChange }: ProfileUserInformationFormProps): ReactElement => {
  return (
    <ContentWrapper>
      <ProfileUserInformationImage formikInstance={formikInstance} onChange={onChange} />
      <ProfileUserInformationFields formikInstance={formikInstance} />
    </ContentWrapper>
  );
};

export default ProfileUserInformationForm;
