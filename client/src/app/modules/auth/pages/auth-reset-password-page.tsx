import { FormikHelpers } from 'formik';
import { ReactElement } from 'react';

import ResetPasswordPreviewImage from '../../../../assets/images/auth/reset-password.jpg';
import { useQueryParams } from '../../../cdk/hooks/useQueryParams';
import { ResetPasswordFormInitialValues } from '../auth.interfaces';
import { authService } from '../auth.service';
import AuthResetPasswordForm from '../components/auth-reset-password-form/auth-reset-password-form';
import {
  RESET_PASSWORD_FORM_INITIAL_VALUE,
  RESET_PASSWORD_FORM_VALIDATION,
} from '../components/auth-reset-password-form/auth-reset-password-form.schema';
import AuthLayout from './auth-layout/auth-layout';

const AuthResetPasswordPage = (): ReactElement => {
  const queryParams = useQueryParams();

  //TODO Replace a link to Reset password page in Firebase (from localstorage to heroku link)
  async function handleFormSubmit(
    values: ResetPasswordFormInitialValues,
    actions: FormikHelpers<ResetPasswordFormInitialValues>
  ): Promise<void> {
    const { newPassword } = values;

    const getOobCodeFromUrl = queryParams.get('oobCode');

    if (getOobCodeFromUrl) {
      await authService.resetPassword(getOobCodeFromUrl, newPassword);
    }

    actions.resetForm();
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
