import { ReactElement, useEffect, useState } from 'react';

import { UserImage } from './fallback-image.styled';
import DefaultUserPhoto from '../../../../assets/images/auth/user.png';
import { UserImageSize } from '../../../app.enums';

interface FallbackImageProps {
  imageUrl: string | null;
  size: UserImageSize;
  isUserAuthenticated?: boolean;
  altText?: string;
  isActive?: boolean;
}

const FallbackImage = ({
  imageUrl,
  size,
  isUserAuthenticated,
  isActive,
  altText,
}: FallbackImageProps): ReactElement => {
  const [imgSrc, setImgSrc] = useState(DefaultUserPhoto);

  useEffect(() => {
    if (imageUrl) {
      setImgSrc(imageUrl);
    }
  }, [imageUrl]);

  return (
    <UserImage
      alt={altText}
      isActive={isActive}
      isUserAuthenticated={isUserAuthenticated}
      size={size}
      src={imgSrc}
      onError={() => setImgSrc(DefaultUserPhoto)}
    />
  );
};

export default FallbackImage;
