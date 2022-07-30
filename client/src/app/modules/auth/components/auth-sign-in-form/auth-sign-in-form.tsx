import { Box } from '@mui/material';
import { Formik } from 'formik';
import { ReactElement } from 'react';
import { SchemaOf } from 'yup';

import { AppRoutes } from '../../../../app.enums';
import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import { SignInFormInitialValues } from '../../auth.interfaces';
import { FormInputContainer, FormLink, FormSubmitButton, FormWrapper, InputLabel } from '../../auth.styled';

interface AuthSignInFormProps {
  initialValues: SignInFormInitialValues;
  validationSchema: SchemaOf<SignInFormInitialValues, never>;
  onSubmit: (values: SignInFormInitialValues) => Promise<void>;
}

const AuthSignInForm = ({ initialValues, validationSchema, onSubmit }: AuthSignInFormProps): ReactElement => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ submitForm, isSubmitting }) => (
        <FormWrapper>
          <FormInputContainer fullWidth variant='standard'>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <FormikInput id='email' name='email' placeholder='Enter your email' />
          </FormInputContainer>
          <FormInputContainer fullWidth variant='standard'>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <FormikInput id='password' name='password' placeholder='Enter your password' type='password' />
          </FormInputContainer>
          <FormSubmitButton
            fullWidth
            disabled={isSubmitting}
            type='submit'
            variant='primaryContained'
            onClick={submitForm}
          >
            Sign-In
          </FormSubmitButton>
          <FormSubmitButton
            fullWidth
            disabled={isSubmitting}
            type='submit'
            variant='secondaryContained'
            onClick={submitForm}
          >
            Sign-In via Google
          </FormSubmitButton>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLink to={AppRoutes.SignUp}>Do not have an account?</FormLink>
            <FormLink to={AppRoutes.ForgotPassword}>Forgot password?</FormLink>
          </Box>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default AuthSignInForm;
