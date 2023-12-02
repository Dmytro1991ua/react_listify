import { FormikProps, useFormik } from 'formik';
import { ReactElement } from 'react';

import ProfileChangePasswordForm from './components/profile-change-password-form/profile-change-password-form';
import ProfileUserInformationForm from './components/profile-user-information-form/profile-user-information-form';
import ProfileUserPreferencesForm from './components/profile-user-preferences-form/profile-user-preferences-form';
import { useProfileFormSubmit } from './hooks/useProfileFormSubmit';
import { useUploadImage } from './hooks/useUploadImage';
import { ProfileFormsInitialValues } from './profile.interfaces';
import { PROFILE_FORM_INITIAL_VALUES, PROFILE_FORM_VALIDATION_SCHEMA } from './profile.schema';
import {
  BlockTitle,
  CommonProfileBlock,
  CommonProfileBlockTitle,
  ProfileAccountSettingsWrapper,
  SectionContentWrapper,
} from './profile.styled';
import SectionHeader from '../../shared/components/section-header/section-header';
import { availableCurrencies, sortedDropdownItems } from '../../utils';
import { useAuthStore } from '../auth/auth.store';

const Profile = (): ReactElement => {
  const user = useAuthStore((state) => state.user);

  const formikProfileFormsInstance: FormikProps<ProfileFormsInitialValues> = useFormik<ProfileFormsInitialValues>({
    initialValues: PROFILE_FORM_INITIAL_VALUES(user),
    validationSchema: PROFILE_FORM_VALIDATION_SCHEMA,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      await handleFormSubmit(values);

      resetForm();
    },
  });

  const { uploadProgress, onImageChange } = useUploadImage({ formikInstance: formikProfileFormsInstance });

  const { onProfileFormSubmit } = useProfileFormSubmit();

  const hasEmailAndPasswordProvider = user?.firebaseProviders?.includes('password');
  const sortedAvailableCurrencies = sortedDropdownItems(availableCurrencies);

  async function handleFormSubmit(values: ProfileFormsInitialValues): Promise<void> {
    await onProfileFormSubmit(values);
  }

  const renderUserInfoBlock = (
    <CommonProfileBlock>
      <CommonProfileBlockTitle variant='h4'>User Information</CommonProfileBlockTitle>
      <ProfileUserInformationForm
        formikInstance={formikProfileFormsInstance}
        uploadProgress={uploadProgress}
        onChange={onImageChange}
      />
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
