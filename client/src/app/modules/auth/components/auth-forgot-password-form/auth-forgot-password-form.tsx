import { Box } from '@mui/system';
import { Formik } from 'formik';
import { ReactElement } from 'react';
import { SchemaOf } from 'yup';

import { AppRoutes } from '../../../../app.enums';
import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import { ForgotPasswordFormInitialValues } from '../../auth.interfaces';
import { FormInputContainer, FormLink, FormSubmitButton, FormWrapper, InputLabel } from '../../auth.styled';

interface AuthForgotPasswordFormFormProps {
  initialValues: ForgotPasswordFormInitialValues;
  validationSchema: SchemaOf<ForgotPasswordFormInitialValues, never>;
  onSubmit: (values: ForgotPasswordFormInitialValues) => Promise<void>;
}

const AuthForgotPasswordForm = ({
  initialValues,
  validationSchema,
  onSubmit,
}: AuthForgotPasswordFormFormProps): ReactElement => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ submitForm, isSubmitting }) => (
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
    </Formik>
  );
};

export default AuthForgotPasswordForm;
