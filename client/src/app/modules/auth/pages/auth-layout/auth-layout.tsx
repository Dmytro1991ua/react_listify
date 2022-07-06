import { Grid } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

import AuthImagePreview from '../../components/auth-image-preview/auth-image-preview';
import { AuthLayoutContainer } from './auth-layout.styled';

interface AuthLayoutProps {
  /**
   * @param {string} Defines a particular image for different auth flow (sign-in, sign-up, etc.)
   * @example 'sign-in-img.jpg'
   */
  image: string;
  /**
   * @param {string} Defines a particular image text overlay based on auth flow
   * @example "Welcome to Listify application. Stay tuned and let's roll"
   */
  overlayText: string;
  children?: ReactNode;
}

const AuthLayout = ({ children, image, overlayText }: AuthLayoutProps): ReactElement => {
  return (
    <AuthLayoutContainer container item xs={12}>
      <Grid item xs={6}>
        <AuthImagePreview image={image} overlayText={overlayText} />
      </Grid>
      <Grid item xs={6}>
        {children}
      </Grid>
    </AuthLayoutContainer>
  );
};

export default AuthLayout;
