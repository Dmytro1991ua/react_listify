import { ReactElement } from 'react';

import { toastService } from '../../services/toast.service';
import SectionHeader from '../../shared/components/section-header/section-header';
import { useAuthStore } from '../auth/auth.store';
import {
  BlockTitle,
  CommonProfileBlock,
  CommonProfileBlockTitle,
  ProfileAccountSettingsWrapper,
} from './profile.styled';

const Profile = (): ReactElement => {
  const user = useAuthStore((state) => state.user);
  const hasEmailAndPasswordProvider = user?.firebaseProviders?.includes('password');

  const renderUserInfoBlock = (
    <CommonProfileBlock>
      <CommonProfileBlockTitle variant='h4'>User Information</CommonProfileBlockTitle>
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
        onPrimaryButtonClick={() => toastService.info('Not Implemented yet')}
      />
      {renderAccountSettingsBlocks}
      {renderApplicationSettingsBlock}
    </section>
  );
};

export default Profile;
