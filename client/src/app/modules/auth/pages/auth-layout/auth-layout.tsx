import { Box, Typography } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { FaLeaf } from 'react-icons/fa';

import AuthImagePreview from '../../components/auth-image-preview/auth-image-preview';
import { AuthFormHeader, AuthFormWrapper, AuthImagePreviewWrapper, AuthLayoutContainer } from './auth-layout.styled';

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
  /**
   * @param {string} Defines an overlaying text position on a specific auth flow cover image
   * Applying for an absolute position of overlaying text
   * @example textPosition="50"
   */
  textPosition?: string;
  children?: ReactNode;
}

const AuthLayout = ({ children, image, overlayText, textPosition }: AuthLayoutProps): ReactElement => {
  return (
    <AuthLayoutContainer container item xs={12}>
      <AuthImagePreviewWrapper>
        <AuthImagePreview image={image} overlayText={overlayText} textPosition={textPosition} />
      </AuthImagePreviewWrapper>
      <AuthFormWrapper>
        <AuthFormHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h2'>Listify</Typography>
            <FaLeaf />
          </Box>
          <Typography paragraph>Your perfect choice for shopping and creating the best grocery list</Typography>
        </AuthFormHeader>
        {children}
      </AuthFormWrapper>
    </AuthLayoutContainer>
  );
};

export default AuthLayout;
