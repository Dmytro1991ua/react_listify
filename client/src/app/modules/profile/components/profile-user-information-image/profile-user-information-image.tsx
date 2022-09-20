import { ReactElement } from 'react';

import { UserImageSize } from '../../../../app.enums';
import FallbackImage from '../../../../shared/components/fallback-image/fallback-image';
import { useAuthStore } from '../../../auth/auth.store';
import { ImageWrapper, ProfileAddButtonIcon, ProfileImageContainer } from './profile-user-information-image.styled';

interface ProfileUserInformationImageProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileUserInformationImage = ({ onChange }: ProfileUserInformationImageProps): ReactElement => {
  const user = useAuthStore((state) => state.user);

  const renderImage = (
    <ImageWrapper>
      <label htmlFor='file'>
        <FallbackImage altText="User's profile photo" imageUrl={user?.photoURL as string} size={UserImageSize.Medium} />
        <ProfileAddButtonIcon onClick={(e) => e.stopPropagation()} />
      </label>
      <input hidden accept='image/*' id='file' name='picture' type='file' onChange={onChange} />
    </ImageWrapper>
  );

  return <ProfileImageContainer>{renderImage}</ProfileImageContainer>;
};

export default ProfileUserInformationImage;
