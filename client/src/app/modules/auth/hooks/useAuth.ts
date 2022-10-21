import { FormikHelpers } from 'formik';
import { useState } from 'react';

import { useQueryParams } from '../../../cdk/hooks/useQueryParams';
import {
  ForgotPasswordFormInitialValues,
  ResetPasswordFormInitialValues,
  SignInFormInitialValues,
  SignUpFormInitialValues,
} from '../auth.interfaces';
import { authService } from '../auth.service';

type ReturnedHookType = {
  isSignInViaGoogleLoading: boolean;
  onSignInFormSubmit: (
    values: SignInFormInitialValues,
    actions: FormikHelpers<SignInFormInitialValues>
  ) => Promise<void>;
  onSignUpFormSubmit: (
    values: SignUpFormInitialValues,
    actions: FormikHelpers<SignUpFormInitialValues>
  ) => Promise<void>;
  onForgotPasswordFormSubmit: (
    values: ForgotPasswordFormInitialValues,
    actions: FormikHelpers<ForgotPasswordFormInitialValues>
  ) => Promise<void>;
  onResetPasswordFormSubmit: (
    values: ResetPasswordFormInitialValues,
    actions: FormikHelpers<ResetPasswordFormInitialValues>
  ) => Promise<void>;
  onFormSubmitViaGoogle: () => Promise<void>;
};

export const useAuth = (): ReturnedHookType => {
  const queryParams = useQueryParams();

  const [isSignInViaGoogleLoading, setIsSignInViaGoogleLoading] = useState<boolean>(false);

  async function onSignInFormSubmit(
    values: SignInFormInitialValues,
    actions: FormikHelpers<SignInFormInitialValues>
  ): Promise<void> {
    const { email, password } = values;

    await authService.signIn(email, password);

    actions.resetForm();
  }

  async function onSignUpFormSubmit(
    values: SignUpFormInitialValues,
    actions: FormikHelpers<SignUpFormInitialValues>
  ): Promise<void> {
    const { name, email, password } = values;

    await authService.signUp(email, password, name ?? '');

    actions.resetForm();
  }

  async function onForgotPasswordFormSubmit(
    values: ForgotPasswordFormInitialValues,
    actions: FormikHelpers<ForgotPasswordFormInitialValues>
  ): Promise<void> {
    const { email } = values;

    await authService.forgotPassword(email);

    actions.resetForm();
  }

  //TODO Replace a link to Reset password page in Firebase (from localhost to heroku link)
  async function onResetPasswordFormSubmit(
    values: ResetPasswordFormInitialValues,
    actions: FormikHelpers<ResetPasswordFormInitialValues>
  ): Promise<void> {
    const { newPassword } = values;

    const getOobCodeFromUrl = queryParams.get('oobCode');

    await authService.resetPassword(getOobCodeFromUrl ?? '', newPassword);
    actions.resetForm();
  }

  async function onFormSubmitViaGoogle(): Promise<void> {
    try {
      setIsSignInViaGoogleLoading(true);
      await authService.signInViaGoogle();
      setIsSignInViaGoogleLoading(false);
    } catch (error) {
      setIsSignInViaGoogleLoading(false);
      return;
    }
  }

  return {
    isSignInViaGoogleLoading,
    onSignInFormSubmit,
    onSignUpFormSubmit,
    onForgotPasswordFormSubmit,
    onResetPasswordFormSubmit,
    onFormSubmitViaGoogle,
  };
};
