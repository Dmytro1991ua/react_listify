import { Box } from '@mui/system';
import { Formik, FormikHelpers } from 'formik';
import { ReactElement } from 'react';
import { Watch } from 'react-loader-spinner';
import { SchemaOf } from 'yup';

import FormikInput from '../../../../shared/components/input/formik-input/formik-input';
import { ResetPasswordFormInitialValues } from '../../auth.interfaces';
import { FormInputContainer, FormSubmitButton, FormWrapper, InputLabel } from '../../auth.styled';

interface AuthResetPasswordFormProps {
  initialValues: ResetPasswordFormInitialValues;
  validationSchema: SchemaOf<ResetPasswordFormInitialValues, never>;
  onSubmit: (
    values: ResetPasswordFormInitialValues,
    actions: FormikHelpers<ResetPasswordFormInitialValues>
  ) => Promise<void>;
}

const AuthResetPasswordForm = ({
  initialValues,
  validationSchema,
  onSubmit,
}: AuthResetPasswordFormProps): ReactElement => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ submitForm, isSubmitting }) => {
        return (
          <>
            {isSubmitting ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Watch color='#1b5e20' height={150} width={150} />
              </Box>
            ) : (
              <FormWrapper>
                <FormInputContainer fullWidth variant='standard'>
                  <InputLabel htmlFor='newPassword'>New Password</InputLabel>
                  <FormikInput id='newPassword' name='newPassword' placeholder='Enter new password' type='password' />
                </FormInputContainer>
                <FormSubmitButton
                  fullWidth
                  disabled={isSubmitting}
                  type='submit'
                  variant='primaryContained'
                  onClick={submitForm}
                >
                  Reset Password
                </FormSubmitButton>
              </FormWrapper>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default AuthResetPasswordForm;
