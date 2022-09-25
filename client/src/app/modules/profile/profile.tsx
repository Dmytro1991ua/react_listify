import { FormikProps, useFormik } from 'formik';
import { ReactElement, useCallback, useEffect, useState } from 'react';

import SectionHeader from '../../shared/components/section-header/section-header';
import { availableCurrencies, sortedDropdownItems } from '../../utils';
import { updateUserDataAction } from '../auth/auth.actions';
import { authService } from '../auth/auth.service';
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

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  //TODO: Remove later on
  console.log(uploadProgress);

  const sortedAvailableCurrencies = sortedDropdownItems(availableCurrencies);

  const formikProfileFormsInstance: FormikProps<ProfileFormsInitialValues> = useFormik<ProfileFormsInitialValues>({
    initialValues: PROFILE_FORM_INITIAL_VALUES(user),
    validationSchema: PROFILE_FORM_VALIDATION_SCHEMA,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      await handleFormSubmit(values);

      resetForm();
    },
  });

  const uploadUserImage = useCallback(async () => {
    try {
      imageUpload && (await authService.uploadFile(imageUpload, setUploadProgress));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }, [imageUpload]);

  useEffect(() => {
    uploadUserImage();
  }, [imageUpload, uploadUserImage]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) {
      return;
    }

    setImageUpload(e.target.files[0]);
    formikProfileFormsInstance.setFieldValue('picture', imageUpload);
  }

  async function handleFormSubmit(values: ProfileFormsInitialValues): Promise<void> {
    try {
      await updateUserDataAction({ name: values.name, photoURL: values.picture });
    } catch (err) {
      throw new Error((err as Error).message);
    }
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
        //TODO Uncomment out later on
        // disabled={!(formikProfileFormsInstance.isValid && formikProfileFormsInstance.dirty)}
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
