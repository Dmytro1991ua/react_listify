import { ReactElement } from 'react';

import SignUpPreviewImage from '../../../../assets/images/auth/sign-up-img.jpg';
import AuthSignUpForm from '../components/auth-sign-up-form/auth-sign-up-form';
import {
  SIGN_UP_FORM_INITIAL_VALUE,
  SIGN_UP_FORM_VALIDATION,
} from '../components/auth-sign-up-form/auth-sign-up-form.schema';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from './auth-layout/auth-layout';

const AuthSignUpPage = (): ReactElement => {
  const { isSignInViaGoogleLoading, onSignUpFormSubmit, onFormSubmitViaGoogle } = useAuth();

  return (
    <AuthLayout
      image={SignUpPreviewImage}
      overlayText="Welcome to Listify application. Stay tuned and let's roll"
      textPosition='30'
    >
      <AuthSignUpForm
        initialValues={SIGN_UP_FORM_INITIAL_VALUE}
        isSignInViaGoogleLoading={isSignInViaGoogleLoading}
        validationSchema={SIGN_UP_FORM_VALIDATION}
        onSubmit={onSignUpFormSubmit}
        onSubmitViaGoogle={onFormSubmitViaGoogle}
      />
    </AuthLayout>
  );
};

export default AuthSignUpPage;
