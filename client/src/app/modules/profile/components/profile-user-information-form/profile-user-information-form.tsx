import { ReactElement } from 'react';

import { ContentWrapper } from '../../profile.styled';
import ProfileUserInformationFields from '../profile-user-information-fields/profile-user-information-fields';
import ProfileUserInformationImage from '../profile-user-information-image/profile-user-information-image';

const ProfileUserInformationForm = (): ReactElement => {
  return (
    <ContentWrapper>
      <ProfileUserInformationImage />
      <ProfileUserInformationFields />
    </ContentWrapper>
  );
};

export default ProfileUserInformationForm;
