import { Typography } from '@mui/material';
import { FormikProps, FormikProvider } from 'formik';
import { ReactElement } from 'react';

import { ImageWrapper, ProfileAddButtonIcon, ProfileImageContainer } from './profile-user-information-image.styled';
import { UserImageSize } from '../../../../app.enums';
import FallbackImage from '../../../../shared/components/fallback-image/fallback-image';
import { useAuthStore } from '../../../auth/auth.store';
import { ProfileFormsInitialValues } from '../../profile.interfaces';
import ProgressBar from '../progress-bar/progress-bar';

interface ProfileUserInformationImageProps {
  formikInstance: FormikProps<ProfileFormsInitialValues>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadProgress: number;
}

const ProfileUserInformationImage = ({
  formikInstance,
  uploadProgress,
  onChange,
}: ProfileUserInformationImageProps): ReactElement => {
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
      {formikInstance.errors.picture && (
        <Typography color='error.main' variant='h5'>
          {formikInstance.errors.picture}
        </Typography>
      )}
      {uploadProgress > 0 && !formikInstance.errors.picture && <ProgressBar uploadProgress={uploadProgress} />}
    </FormikProvider>
  );

  return <ProfileImageContainer>{renderImage}</ProfileImageContainer>;
};

export default ProfileUserInformationImage;
