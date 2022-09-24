import { Form, FormikProps, FormikProvider } from 'formik';
import { ReactElement } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { Currencies } from '../../../../app.enums';
import { DropdownOption } from '../../../../shared/components/select/select.interfaces';
import Switch from '../../../../shared/components/switch/switch';
import { ProfileFormsInitialValues } from '../../profile.interfaces';
import { FieldLabel, InputFieldDivider, ProfileCurrenciesSelect } from './profile-user-preferences-fields.styled';

interface ProfileUserPreferencesFieldsProps {
  formikInstance: FormikProps<ProfileFormsInitialValues>;
  options: DropdownOption<string>[];
}

const ProfileUserPreferencesFields = ({ formikInstance, options }: ProfileUserPreferencesFieldsProps): ReactElement => {
  return (
    <FormikProvider value={formikInstance}>
      <Form>
        <InputFieldDivider>
          <FieldLabel variant='h5'>Calculate prices by quantity:</FieldLabel>
          <Switch
            checked={formikInstance.values.calculatedPrice as boolean}
            size='small'
            onChange={(e) => formikInstance.setFieldValue('calculatedPrice', e.target.checked)}
          />
        </InputFieldDivider>
        <InputFieldDivider>
          <FieldLabel variant='h5'>Default currency:</FieldLabel>
          <ProfileCurrenciesSelect
            fullWidth
            icon={IoMdArrowDropdown}
            label='Select Currency'
            name='currency'
            options={options}
            value={formikInstance.values.defaultCurrency ?? Currencies.Dollar}
            onChange={(e) => formikInstance.setFieldValue('defaultCurrency', e.target.value)}
          />
        </InputFieldDivider>
      </Form>
    </FormikProvider>
  );
};

export default ProfileUserPreferencesFields;
