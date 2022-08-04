import { FormikHelpers } from 'formik';
import { ReactElement, useState } from 'react';

import SignInPreviewImage from '../../../../assets/images/auth/sign-in-img.jpg';
import { SignInFormInitialValues } from '../auth.interfaces';
import { authService } from '../auth.service';
import AuthSignInForm from '../components/auth-sign-in-form/auth-sign-in-form';
import {
  SIGN_IN_FORM_INITIAL_VALUE,
  SIGN_IN_FORM_VALIDATION,
} from '../components/auth-sign-in-form/auth-sign-in-form.schema';
import AuthLayout from './auth-layout/auth-layout';

const AuthSignInPage = (): ReactElement => {
  const [isSignInViaGoogleLoading, setIsSignInViaGoogleLoading] = useState<boolean>(false);

  async function handleFormSubmit(
    values: SignInFormInitialValues,
    actions: FormikHelpers<SignInFormInitialValues>
  ): Promise<void> {
    const { email, password } = values;

    await authService.signIn(email, password);

    actions.resetForm();
  }

  async function handleFormSubmitViaGoogle(): Promise<void> {
    try {
      setIsSignInViaGoogleLoading(true);
      await authService.signInViaGoogle();
      setIsSignInViaGoogleLoading(false);
    } catch (error) {
      setIsSignInViaGoogleLoading(false);
      return;
    }
  }

  return (
    <AuthLayout image={SignInPreviewImage} overlayText="Welcome to Listify application. Stay tuned and let's roll">
      <AuthSignInForm
        initialValues={SIGN_IN_FORM_INITIAL_VALUE}
        isSignInViaGoogleLoading={isSignInViaGoogleLoading}
        validationSchema={SIGN_IN_FORM_VALIDATION}
        onSubmit={handleFormSubmit}
        onSubmitViaGoogle={handleFormSubmitViaGoogle}
      />
    </AuthLayout>
  );
};

export default AuthSignInPage;
