import { ReactElement } from 'react';

import SignInPreviewImage from '../../../../assets/images/auth/sign-in-img.jpg';
import AuthSignInForm from '../components/auth-sign-in-form/auth-sign-in-form';
import {
  SIGN_IN_FORM_INITIAL_VALUE,
  SIGN_IN_FORM_VALIDATION,
} from '../components/auth-sign-in-form/auth-sign-in-form.schema';
import { toastService } from './../../../services/toast.service';
import AuthLayout from './auth-layout/auth-layout';

const AuthSignInPage = (): ReactElement => {
  async function handleFormSubmit(): Promise<void> {
    toastService.info('Not implemented yet');
  }

  return (
    <AuthLayout image={SignInPreviewImage} overlayText="Welcome to Listify application. Stay tuned and let's roll">
      <AuthSignInForm
        initialValues={SIGN_IN_FORM_INITIAL_VALUE}
        validationSchema={SIGN_IN_FORM_VALIDATION}
        onSubmit={handleFormSubmit}
      />
    </AuthLayout>
  );
};

export default AuthSignInPage;
