import * as yup from 'yup';

import { SignUpFormInitialValues } from '../../auth.interfaces';

export const SIGN_UP_FORM_INITIAL_VALUE: SignUpFormInitialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const SIGN_UP_FORM_VALIDATION: yup.SchemaOf<SignUpFormInitialValues> = yup.object().shape({
  name: yup.string().label('Name'),
  email: yup.string().email().label('Email').required(),
  password: yup.string().label('Password').required().trim(),
  confirmPassword: yup
    .string()
    .label('Confirm Password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required()
    .trim(),
});
