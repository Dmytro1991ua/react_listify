import { Box, Grid, Typography } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { FaLeaf } from 'react-icons/fa';

import AuthImagePreview from '../../components/auth-image-preview/auth-image-preview';
import { AuthFormHeader, AuthFormWrapper, AuthLayoutContainer } from './auth-layout.styled';

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
    <AuthLayoutContainer container item component='section' xs={12}>
      <Grid item xs={6}>
        <AuthImagePreview image={image} overlayText={overlayText} />
      </Grid>
      <AuthFormWrapper item xs={6}>
        <AuthFormHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h2'>Listify</Typography>
            <FaLeaf />
          </Box>
          <Typography paragraph>Your perfect choice for shopping</Typography>
        </AuthFormHeader>
        {children}
      </AuthFormWrapper>
    </AuthLayoutContainer>
  );
};

export default AuthLayout;
