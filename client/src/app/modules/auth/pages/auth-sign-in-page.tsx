import { ReactElement } from 'react';

import SignInPreviewImage from '../../../../assets/images/auth/sign-in-img.jpg';
import AuthSignInForm from '../components/auth-sign-in-form/auth-sign-in-form';
import AuthLayout from './auth-layout/auth-layout';

const AuthSignInPage = (): ReactElement => {
  return (
    <AuthLayout image={SignInPreviewImage} overlayText="Welcome to Listify application. Stay tuned and let's roll">
      <AuthSignInForm />
    </AuthLayout>
  );
};

export default AuthSignInPage;
