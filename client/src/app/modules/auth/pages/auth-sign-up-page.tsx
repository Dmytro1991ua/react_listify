import { ReactElement } from 'react';

import SignUpPreviewImage from '../../../../assets/images/auth/sign-up-img.jpg';
import { toastService } from '../../../services/toast.service';
import AuthSignUpForm from '../components/auth-sign-up-form/auth-sign-up-form';
import {
  SIGN_UP_FORM_INITIAL_VALUE,
  SIGN_UP_FORM_VALIDATION,
} from '../components/auth-sign-up-form/auth-sign-up-form.schema';
import AuthLayout from './auth-layout/auth-layout';

const AuthSignUpPage = (): ReactElement => {
  async function handleFormSubmit(): Promise<void> {
    toastService.info('Not implemented yet');
  }

  return (
    <AuthLayout
      image={SignUpPreviewImage}
      overlayText="Welcome to Listify application. Stay tuned and let's roll"
      textPosition='30'
    >
      <AuthSignUpForm
        initialValues={SIGN_UP_FORM_INITIAL_VALUE}
        validationSchema={SIGN_UP_FORM_VALIDATION}
        onSubmit={handleFormSubmit}
      />
    </AuthLayout>
  );
};

export default AuthSignUpPage;
