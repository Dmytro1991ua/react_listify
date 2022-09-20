import { FormikProps, useFormik } from 'formik';
import { ReactElement } from 'react';

import SectionHeader from '../../shared/components/section-header/section-header';
import { useAuthStore } from '../auth/auth.store';
import ProfileUserInformationForm from './components/profile-user-information-form/profile-user-information-form';
import { ProfileUserInformationInitialValues } from './components/profile-user-information-form/profile-user-information-form.interfaces';
import {
  USER_INFORMATION_FORM_INITIAL_VALUE,
  USER_INFORMATION_FORM_VALIDATION,
} from './components/profile-user-information-form/profile-user-information-form.schema';
import {
  BlockTitle,
  CommonProfileBlock,
  CommonProfileBlockTitle,
  ProfileAccountSettingsWrapper,
} from './profile.styled';

const Profile = (): ReactElement => {
  const user = useAuthStore((state) => state.user);
  const hasEmailAndPasswordProvider = user?.firebaseProviders?.includes('password');

  const formikUserInformationInstance: FormikProps<ProfileUserInformationInitialValues> =
    useFormik<ProfileUserInformationInitialValues>({
      initialValues: USER_INFORMATION_FORM_INITIAL_VALUE(user),
      validationSchema: USER_INFORMATION_FORM_VALIDATION,
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

    formikUserInformationInstance.setFieldValue('picture', e.target.files[0]);
  }

  const renderUserInfoBlock = (
    <CommonProfileBlock>
      <CommonProfileBlockTitle variant='h4'>User Information</CommonProfileBlockTitle>
      <ProfileUserInformationForm formikInstance={formikUserInformationInstance} onChange={handleImageChange} />
    </CommonProfileBlock>
  );

  const renderChangePasswordBlock = (
    <CommonProfileBlock>
      <CommonProfileBlockTitle variant='h4'>Change Password</CommonProfileBlockTitle>
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
      </CommonProfileBlock>
    </>
  );

  return (
    <section>
      <SectionHeader
        primaryBtnLabel='Save'
        title='Profile'
        onPrimaryButtonClick={formikUserInformationInstance.submitForm}
      />
      {renderAccountSettingsBlocks}
      {renderApplicationSettingsBlock}
    </section>
  );
};

export default Profile;
