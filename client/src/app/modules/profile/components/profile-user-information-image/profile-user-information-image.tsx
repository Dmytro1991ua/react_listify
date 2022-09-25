import { FormikProps, FormikProvider } from 'formik';
import { ReactElement } from 'react';

import { UserImageSize } from '../../../../app.enums';
import FallbackImage from '../../../../shared/components/fallback-image/fallback-image';
import { useAuthStore } from '../../../auth/auth.store';
import { ProfileFormsInitialValues } from '../../profile.interfaces';
import { ImageWrapper, ProfileAddButtonIcon, ProfileImageContainer } from './profile-user-information-image.styled';

interface ProfileUserInformationImageProps {
  formikInstance: FormikProps<ProfileFormsInitialValues>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileUserInformationImage = ({ formikInstance, onChange }: ProfileUserInformationImageProps): ReactElement => {
  const user = useAuthStore((state) => state.user);

  const renderImage = (
    <FormikProvider value={formikInstance}>
      <ImageWrapper>
        <label htmlFor='file'>
          <FallbackImage
            altText="User's profile photo"
            imageUrl={user?.photoURL as string}
            size={UserImageSize.Medium}
          />
          <ProfileAddButtonIcon onClick={(e) => e.stopPropagation()} />
        </label>
        <input hidden accept='image/*' id='file' name='picture' type='file' onChange={onChange} />
      </ImageWrapper>
    </FormikProvider>
  );

  return <ProfileImageContainer>{renderImage}</ProfileImageContainer>;
};

export default ProfileUserInformationImage;
