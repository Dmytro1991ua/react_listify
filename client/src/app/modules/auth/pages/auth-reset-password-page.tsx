import { ReactElement } from 'react';

import AuthLayout from './auth-layout/auth-layout';
import ResetPasswordPreviewImage from '../../../../assets/images/auth/reset-password.jpg';
import AuthResetPasswordForm from '../components/auth-reset-password-form/auth-reset-password-form';
import {
  RESET_PASSWORD_FORM_INITIAL_VALUE,
  RESET_PASSWORD_FORM_VALIDATION,
} from '../components/auth-reset-password-form/auth-reset-password-form.schema';
import { useAuth } from '../hooks/useAuth';

const AuthResetPasswordPage = (): ReactElement => {
  const { onResetPasswordFormSubmit } = useAuth();

  return (
    <AuthLayout
      image={ResetPasswordPreviewImage}
      overlayText="Welcome to Listify application. Stay tuned and let's roll"
      textPosition='90'
    >
      <AuthResetPasswordForm
        initialValues={RESET_PASSWORD_FORM_INITIAL_VALUE}
        validationSchema={RESET_PASSWORD_FORM_VALIDATION}
        onSubmit={onResetPasswordFormSubmit}
      />
    </AuthLayout>
  );
};

export default AuthResetPasswordPage;
