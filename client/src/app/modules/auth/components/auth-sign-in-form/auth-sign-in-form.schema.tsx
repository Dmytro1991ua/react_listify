import * as yup from 'yup';

import { SignInFormInitialValues } from '../../auth.interfaces';

export const SIGN_IN_FORM_INITIAL_VALUE: SignInFormInitialValues = {
  email: '',
  password: '',
};

export const SIGN_IN_FORM_VALIDATION: yup.SchemaOf<SignInFormInitialValues> = yup.object().shape({
  email: yup.string().label('Email').required(),
  password: yup.string().label('Password').required().trim(),
});
