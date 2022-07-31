import { Typography } from '@mui/material';
import { ReactElement } from 'react';

import { ImagePreviewSection } from './auth-image-preview.styled';

interface AuthImagePreviewProps {
  image: string;
  overlayText: string;
  textPosition?: string;
}

const AuthImagePreview = ({ image, overlayText, textPosition }: AuthImagePreviewProps): ReactElement => {
  return (
    <ImagePreviewSection textPosition={textPosition}>
      <img alt='auth welcoming image' src={image} />
      <Typography paragraph>{overlayText}</Typography>
    </ImagePreviewSection>
  );
};

export default AuthImagePreview;
