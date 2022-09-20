import * as yup from 'yup';

import { CurrentUser } from './../../../../app.interfaces';
import { FILE_SIZE, SUPPORTED_IMAGE_EXTENSIONS } from './profile-user-information-form.constants';
import { ProfileUserInformationInitialValues } from './profile-user-information-form.interfaces';

export const USER_INFORMATION_FORM_INITIAL_VALUE = (
  currentUser: CurrentUser | null
): ProfileUserInformationInitialValues => {
  return {
    picture: currentUser?.photoURL ?? '',
    email: currentUser?.email ?? '',
    name: currentUser?.name ?? '',
  };
};

export const USER_INFORMATION_FORM_VALIDATION: yup.SchemaOf<ProfileUserInformationInitialValues> = yup.object().shape(
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
          .test('fileSize', 'The file is too large', (value) => {
            return !value || (value && value.size <= FILE_SIZE);
          })
          .test('type', 'Unsupported image format', function (value) {
            return !value || (value && SUPPORTED_IMAGE_EXTENSIONS.includes(value.type));
          });
      }),
    email: yup.string().label('Email'),
    name: yup.string().label('Name'),
  },
  [['picture', 'picture']]
);
