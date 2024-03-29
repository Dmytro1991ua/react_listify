import { Form, FormikProps, FormikProvider } from 'formik';
import { ReactElement } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { FieldLabel, InputFieldDivider, ProfileCurrenciesSelect } from './profile-user-preferences-fields.styled';
import { Currencies } from '../../../../app.enums';
import { DropdownOption } from '../../../../shared/components/select/select.interfaces';
import Switch from '../../../../shared/components/switch/switch';
import { ProfileFormsInitialValues } from '../../profile.interfaces';

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
            name='calculatedPrice'
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
            name='defaultCurrency'
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
