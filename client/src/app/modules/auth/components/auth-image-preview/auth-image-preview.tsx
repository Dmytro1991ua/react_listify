import { ReactElement } from 'react';

interface AuthImagePreviewProps {
  image: string;
  overlayText: string;
}

const AuthImagePreview = ({ image, overlayText }: AuthImagePreviewProps): ReactElement => {
  return (
    <>
      <img alt='auth welcoming image' src={image} />
      <p>{overlayText}</p>
    </>
  );
};

export default AuthImagePreview;
