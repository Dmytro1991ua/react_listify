import { FormikProps, useFormik } from 'formik';
import { ReactElement } from 'react';

import SectionHeader from '../../shared/components/section-header/section-header';
import { availableCurrencies, sortedDropdownItems } from '../../utils';
import { useAuthStore } from '../auth/auth.store';
import ProfileChangePasswordForm from './components/profile-change-password-form/profile-change-password-form';
import ProfileUserInformationForm from './components/profile-user-information-form/profile-user-information-form';
import ProfileUserPreferencesForm from './components/profile-user-preferences-form/profile-user-preferences-form';
import { ProfileFormsInitialValues } from './profile.interfaces';
import { PROFILE_FORM_INITIAL_VALUES, PROFILE_FORM_VALIDATION_SCHEMA } from './profile.schema';
import {
  BlockTitle,
  CommonProfileBlock,
  CommonProfileBlockTitle,
  ProfileAccountSettingsWrapper,
  SectionContentWrapper,
} from './profile.styled';

const Profile = (): ReactElement => {
  const user = useAuthStore((state) => state.user);
  const hasEmailAndPasswordProvider = user?.firebaseProviders?.includes('password');

  const sortedAvailableCurrencies = sortedDropdownItems(availableCurrencies);

  const formikProfileFormsInstance: FormikProps<ProfileFormsInitialValues> = useFormik<ProfileFormsInitialValues>({
    initialValues: PROFILE_FORM_INITIAL_VALUES(user),
    validationSchema: PROFILE_FORM_VALIDATION_SCHEMA,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      resetForm();
    },
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) {
      return;
    }

    formikProfileFormsInstance.setFieldValue('picture', e.target.files[0]);
  }

  const renderUserInfoBlock = (
    <CommonProfileBlock>
      <CommonProfileBlockTitle variant='h4'>User Information</CommonProfileBlockTitle>
      <ProfileUserInformationForm formikInstance={formikProfileFormsInstance} onChange={handleImageChange} />
    </CommonProfileBlock>
  );

  const renderChangePasswordBlock = (
    <CommonProfileBlock>
      <CommonProfileBlockTitle variant='h4'>Change Password</CommonProfileBlockTitle>
      <ProfileChangePasswordForm formikInstance={formikProfileFormsInstance} />
    </CommonProfileBlock>
  );

  const renderAccountSettingsBlocks = (
    <>
      <BlockTitle variant='h3'>Account Settings</BlockTitle>
      <ProfileAccountSettingsWrapper hasEmailAndPasswordProvider={hasEmailAndPasswordProvider}>
        {renderUserInfoBlock}
        {hasEmailAndPasswordProvider && renderChangePasswordBlock}
      </ProfileAccountSettingsWrapper>
    </>
  );

  const renderApplicationSettingsBlock = (
    <>
      <BlockTitle variant='h3'>Application Settings</BlockTitle>
      <CommonProfileBlock>
        <CommonProfileBlockTitle variant='h4'>Change Application&apos;s global preferences</CommonProfileBlockTitle>
        <ProfileUserPreferencesForm formikInstance={formikProfileFormsInstance} options={sortedAvailableCurrencies} />
      </CommonProfileBlock>
    </>
  );

  return (
    <section>
      <SectionHeader
        disabled={!formikProfileFormsInstance.dirty}
        primaryBtnLabel='Save'
        title='Profile'
        onPrimaryButtonClick={formikProfileFormsInstance.submitForm}
      />
      <SectionContentWrapper>
        {renderAccountSettingsBlocks}
        {renderApplicationSettingsBlock}
      </SectionContentWrapper>
    </section>
  );
};

export default Profile;
