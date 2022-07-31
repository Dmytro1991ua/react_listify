import { FormikHelpers } from 'formik';
import { ReactElement } from 'react';

import ForgotPasswordPreviewImage from '../../../../assets/images/auth/forgot-password.jpg';
import { ForgotPasswordFormInitialValues } from '../auth.interfaces';
import { authService } from '../auth.service';
import AuthForgotPasswordForm from '../components/auth-forgot-password-form/auth-forgot-password-form';
import {
  FORGOT_PASSWORD_FORM_INITIAL_VALUE,
  FORGOT_PASSWORD_FORM_VALIDATION,
} from '../components/auth-forgot-password-form/auth-forgot-password-form.schema';
import AuthLayout from './auth-layout/auth-layout';

const AuthForgotPasswordPage = (): ReactElement => {
  async function handleFormSubmit(
    values: ForgotPasswordFormInitialValues,
    actions: FormikHelpers<ForgotPasswordFormInitialValues>
  ): Promise<void> {
    const { email } = values;

    await authService.forgotPassword(email);

    actions.resetForm();
  }

  return (
    <AuthLayout
      image={ForgotPasswordPreviewImage}
      overlayText="Welcome to Listify application. Stay tuned and let's roll"
      textPosition='85'
    >
      <AuthForgotPasswordForm
        initialValues={FORGOT_PASSWORD_FORM_INITIAL_VALUE}
        validationSchema={FORGOT_PASSWORD_FORM_VALIDATION}
        onSubmit={handleFormSubmit}
      />
    </AuthLayout>
  );
};

export default AuthForgotPasswordPage;
