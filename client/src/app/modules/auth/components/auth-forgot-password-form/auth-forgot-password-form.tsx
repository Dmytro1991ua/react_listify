import { Box } from '@mui/system';
import { Formik, FormikHelpers } from 'formik';
import { ReactElement } from 'react';
import { Rings } from 'react-loader-spinner';
import { SchemaOf } from 'yup';

import { AppRoutes } from '../../../../app.enums';
import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import { ForgotPasswordFormInitialValues } from '../../auth.interfaces';
import { FormInputContainer, FormLink, FormSubmitButton, FormWrapper, InputLabel } from '../../auth.styled';

interface AuthForgotPasswordFormFormProps {
  initialValues: ForgotPasswordFormInitialValues;
  validationSchema: SchemaOf<ForgotPasswordFormInitialValues, never>;
  onSubmit: (
    values: ForgotPasswordFormInitialValues,
    actions: FormikHelpers<ForgotPasswordFormInitialValues>
  ) => Promise<void>;
}

const AuthForgotPasswordForm = ({
  initialValues,
  validationSchema,
  onSubmit,
}: AuthForgotPasswordFormFormProps): ReactElement => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ submitForm, isSubmitting }) => {
        return (
          <>
            {isSubmitting ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Rings color='#1b5e20' height={200} width={200} />
              </Box>
            ) : (
              <FormWrapper>
                <FormInputContainer fullWidth variant='standard'>
                  <InputLabel htmlFor='email'>Email</InputLabel>
                  <FormikInput id='email' name='email' placeholder='Enter your email' type='email' />
                </FormInputContainer>
                <FormSubmitButton
                  fullWidth
                  disabled={isSubmitting}
                  type='submit'
                  variant='primaryContained'
                  onClick={submitForm}
                >
                  Submit
                </FormSubmitButton>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLink to={AppRoutes.SignIn}>Already have an account?</FormLink>
                  <FormLink to={AppRoutes.SignUp}>Do not have an account?</FormLink>
                </Box>
              </FormWrapper>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default AuthForgotPasswordForm;
