import { ReactElement } from 'react';

import { UserImageSize } from '../../../../app.enums';
import FallbackImage from '../../../../shared/components/fallback-image/fallback-image';
import { useAuthStore } from '../../../auth/auth.store';
import {
  ImageWrapper,
  ProfileAddButtonIcon,
  ProfileImageContainer,
  ProfileInputFile,
} from './profile-user-information-image.styled';

const ProfileUserInformationImage = (): ReactElement => {
  const user = useAuthStore((state) => state.user);

  const renderImage = (
    <ImageWrapper>
      <label htmlFor='file'>
        <FallbackImage altText="User's profile photo" imageUrl={user?.photoURL as string} size={UserImageSize.Medium} />
        <ProfileAddButtonIcon onClick={(e) => e.stopPropagation()} />
      </label>
      <ProfileInputFile
        accept='.jpg, .jpeg, .png'
        id='file'
        type='file'
        onChange={(e) => console.log(e.target.files)}
      />
    </ImageWrapper>
  );

  return <ProfileImageContainer>{renderImage}</ProfileImageContainer>;
};

export default ProfileUserInformationImage;
