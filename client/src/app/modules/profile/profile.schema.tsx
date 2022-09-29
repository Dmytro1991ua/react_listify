import * as yup from 'yup';

import { Currencies } from '../../app.enums';
import { CurrentUser } from '../../app.interfaces';
import { FILE_SIZE, SUPPORTED_IMAGE_EXTENSIONS } from './profile.constants';
import { ProfileFormsInitialValues } from './profile.interfaces';

export const PROFILE_FORM_INITIAL_VALUES = (currentUser: CurrentUser | null): ProfileFormsInitialValues => {
  return {
    picture: currentUser?.photoURL ?? null,
    email: currentUser?.email ?? '',
    name: currentUser?.name ?? '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    calculatedPrice: currentUser?.calculateByQuantity ?? false,
    defaultCurrency: currentUser?.currency ?? Currencies.Dollar,
  };
};

export const PROFILE_FORM_VALIDATION_SCHEMA: yup.SchemaOf<ProfileFormsInitialValues> = yup.object().shape(
  {
    picture: yup
      .mixed()
      .label('Picture')
      .when('picture', (value) => {
        if (value && typeof value === 'string') {
          return yup.mixed().notRequired();
        }

        return yup
          .mixed()
          .test('fileSize', 'Uploaded image is too large', (value) => !value || (value && value.size <= FILE_SIZE))
          .test(
            'type',
            'Unsupported image format',
            (value) => !value || (value && SUPPORTED_IMAGE_EXTENSIONS.includes(value?.type))
          );
      }),
    email: yup.string().label('Email'),
    name: yup.string().label('Name'),
    currentPassword: yup
      .string()
      .label('Current Password')
      .when('newPassword', {
        is: (value: string) => value && value.length > 0,
        then: yup.string().required('Old password is required when setting new password'),
        otherwise: yup.string(),
      }),
    newPassword: yup
      .string()
      .label('New Password')
      .when('currentPassword', {
        is: (value: string) => value && value.length > 0,
        then: yup.string().required('Password is required when setting new password'),
        otherwise: yup.string(),
      })
      .matches(/[a-z]+/, 'One lowercase character')
      .matches(/[A-Z]+/, 'One uppercase character')
      .matches(/[@$!%*#?&]+/, 'One special character')
      .matches(/\d+/, 'One number')
      .when('currentPassword', {
        is: (value: string) => value && value.length > 0,
        then: yup.string().required('Password is required when setting new password'),
        otherwise: yup.string(),
      })
      .test(
        'empty-or-8-characters-check',
        'Password must be at least 8 characters',
        (password) => !password || password.length >= 8
      ),
    confirmPassword: yup
      .string()
      .label('Confirm Password')
      .when('newPassword', {
        is: (value: string) => value && value.length > 0,
        then: yup
          .string()
          .required('Password confirmation is required when setting new password')
          .oneOf([yup.ref('newPassword'), null], 'Must match new password'),
        otherwise: yup.string(),
      }),
    calculatedPrice: yup.bool().label('Calculated Price'),
    defaultCurrency: yup.mixed<Currencies>().oneOf(Object.values(Currencies)),
  },
  [
    ['picture', 'picture'],
    ['currentPassword', 'newPassword'],
  ]
);
