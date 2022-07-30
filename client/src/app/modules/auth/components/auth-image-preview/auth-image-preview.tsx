import { Typography } from '@mui/material';
import { ReactElement } from 'react';

import { ImagePreviewSection } from './auth-image-preview.styled';

interface AuthImagePreviewProps {
  image: string;
  overlayText: string;
}

const AuthImagePreview = ({ image, overlayText }: AuthImagePreviewProps): ReactElement => {
  return (
    <ImagePreviewSection>
      <img alt='auth welcoming image' src={image} />
      <Typography paragraph>{overlayText}</Typography>
    </ImagePreviewSection>
  );
};

export default AuthImagePreview;
