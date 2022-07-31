import { FormikHelpers } from 'formik';
import { ReactElement, useState } from 'react';

import SignUpPreviewImage from '../../../../assets/images/auth/sign-up-img.jpg';
import { SignUpFormInitialValues } from '../auth.interfaces';
import { authService } from '../auth.service';
import AuthSignUpForm from '../components/auth-sign-up-form/auth-sign-up-form';
import {
  SIGN_UP_FORM_INITIAL_VALUE,
  SIGN_UP_FORM_VALIDATION,
} from '../components/auth-sign-up-form/auth-sign-up-form.schema';
import AuthLayout from './auth-layout/auth-layout';

const AuthSignUpPage = (): ReactElement => {
  const [isSignInViaGoogleLoading, setIsSignInViaGoogleLoading] = useState<boolean>(false);

  async function handleFormSubmit(
    values: SignUpFormInitialValues,
    actions: FormikHelpers<SignUpFormInitialValues>
  ): Promise<void> {
    const { name, email, password } = values;

    await authService.signUp(email, password, name);

    actions.resetForm();
  }

  async function handleFormSubmitViaGoogle(): Promise<void> {
    try {
      setIsSignInViaGoogleLoading(true);
      await authService.signInViaGoogle();
      setIsSignInViaGoogleLoading(false);
    } catch {
      setIsSignInViaGoogleLoading(false);
      return;
    }
  }

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
        onSubmit={handleFormSubmit}
        onSubmitViaGoogle={handleFormSubmitViaGoogle}
      />
    </AuthLayout>
  );
};

export default AuthSignUpPage;
