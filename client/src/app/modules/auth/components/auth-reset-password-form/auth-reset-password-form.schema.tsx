import * as yup from 'yup';

import { ResetPasswordFormInitialValues } from '../../auth.interfaces';

export const RESET_PASSWORD_FORM_INITIAL_VALUE: ResetPasswordFormInitialValues = {
  newPassword: '',
};

export const RESET_PASSWORD_FORM_VALIDATION: yup.SchemaOf<ResetPasswordFormInitialValues> = yup.object().shape({
  newPassword: yup
    .string()
    .label('New Password')
    .required()
    .min(8, 'Should be at least 8 characters')
    .matches(/[a-z]+/, 'One lowercase character')
    .matches(/[A-Z]+/, 'One uppercase character')
    .matches(/[@$!%*#?&]+/, 'One special character')
    .matches(/\d+/, 'One number'),
});
