import { FormikProps } from 'formik';
import { ReactElement } from 'react';

import { DropdownOption } from '../../../../shared/components/select/select.interfaces';
import { ProfileFormsInitialValues } from '../../profile.interfaces';
import ProfileUserPreferencesFields from '../profile-user-preferences-fields/profile-user-preferences-fields';

interface ProfileUserPreferencesFormProps {
  formikInstance: FormikProps<ProfileFormsInitialValues>;
  options: DropdownOption<string>[];
}

const ProfileUserPreferencesForm = ({ formikInstance, options }: ProfileUserPreferencesFormProps): ReactElement => {
  return <ProfileUserPreferencesFields formikInstance={formikInstance} options={options} />;
};

export default ProfileUserPreferencesForm;
