import * as yup from 'yup';

import { ForgotPasswordFormInitialValues } from '../../auth.interfaces';

export const FORGOT_PASSWORD_FORM_INITIAL_VALUE: ForgotPasswordFormInitialValues = {
  email: '',
};

export const FORGOT_PASSWORD_FORM_VALIDATION: yup.SchemaOf<ForgotPasswordFormInitialValues> = yup.object().shape({
  email: yup.string().email().label('Email').required(),
});
