import { Box } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { ReactElement } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { SchemaOf } from 'yup';

import { AppRoutes } from '../../../../app.enums';
import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import { SignInFormInitialValues } from '../../auth.interfaces';
import { FormInputContainer, FormLink, FormSubmitButton, FormWrapper, InputLabel } from '../../auth.styled';

interface AuthSignInFormProps {
  initialValues: SignInFormInitialValues;
  validationSchema: SchemaOf<SignInFormInitialValues, never>;
  onSubmit: (values: SignInFormInitialValues, actions: FormikHelpers<SignInFormInitialValues>) => Promise<void>;
  onSubmitViaGoogle: () => Promise<void>;
  isSignInViaGoogleLoading?: boolean;
}

const AuthSignInForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  onSubmitViaGoogle,
  isSignInViaGoogleLoading,
}: AuthSignInFormProps): ReactElement => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ submitForm, isSubmitting }) => {
        return (
          <>
            {isSubmitting || isSignInViaGoogleLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <BallTriangle color='#1b5e20' height={150} width={150} />
              </Box>
            ) : (
              <FormWrapper>
                <FormInputContainer fullWidth variant='standard'>
                  <InputLabel htmlFor='email'>Email</InputLabel>
                  <FormikInput id='email' name='email' placeholder='Enter your email' type='email' />
                </FormInputContainer>
                <FormInputContainer fullWidth variant='standard'>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <FormikInput id='password' name='password' placeholder='Enter your password' type='password' />
                </FormInputContainer>
                <FormSubmitButton
                  fullWidth
                  ariaLabel='submit-btn'
                  disabled={isSubmitting}
                  type='submit'
                  variant='primaryContained'
                  onClick={submitForm}
                >
                  Sign-In
                </FormSubmitButton>
                <FormSubmitButton
                  fullWidth
                  ariaLabel='google-submit-btn'
                  disabled={isSubmitting}
                  type='submit'
                  variant='secondaryContained'
                  onClick={onSubmitViaGoogle}
                >
                  Sign-In via Google
                </FormSubmitButton>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLink to={AppRoutes.SignUp}>Do not have an account?</FormLink>
                  <FormLink to={AppRoutes.ForgotPassword}>Forgot password?</FormLink>
                </Box>
              </FormWrapper>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default AuthSignInForm;
