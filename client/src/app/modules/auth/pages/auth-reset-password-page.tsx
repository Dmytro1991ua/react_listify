import { ReactElement } from 'react';

import ResetPasswordPreviewImage from '../../../../assets/images/auth/reset-password.jpg';
import { ResetPasswordFormInitialValues } from '../auth.interfaces';
import AuthResetPasswordForm from '../components/auth-reset-password-form/auth-reset-password-form';
import {
  RESET_PASSWORD_FORM_INITIAL_VALUE,
  RESET_PASSWORD_FORM_VALIDATION,
} from '../components/auth-reset-password-form/auth-reset-password-form.schema';
import { toastService } from './../../../services/toast.service';
import AuthLayout from './auth-layout/auth-layout';

const AuthResetPasswordPage = (): ReactElement => {
  async function handleFormSubmit(values: ResetPasswordFormInitialValues): Promise<void> {
    toastService.info('Not implemented yet');
    console.log(values);
  }

  return (
    <AuthLayout
      image={ResetPasswordPreviewImage}
      overlayText="Welcome to Listify application. Stay tuned and let's roll"
      textPosition='90'
    >
      <AuthResetPasswordForm
        initialValues={RESET_PASSWORD_FORM_INITIAL_VALUE}
        validationSchema={RESET_PASSWORD_FORM_VALIDATION}
        onSubmit={handleFormSubmit}
      />
    </AuthLayout>
  );
};

export default AuthResetPasswordPage;
