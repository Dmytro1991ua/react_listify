import { renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { Currencies } from '../../../app.enums';
import firebase from '../../../configs/firebase';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../mocks/test-mocks';
import * as authActions from '../../auth/auth.actions';
import { authService } from '../../auth/auth.service';
import { useProfileFormSubmit } from './useProfileFormSubmit';
import { useUpdateUserInfo } from './useUpdateUserInfo';
import { useUpdateUserPreferences } from './useUpdateUserPreferences';

describe('useProfileFormSubmit', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(authService, 'changeUserPassword');
    vi.spyOn(authService, 'updateUserData');
    vi.spyOn(authActions, 'updateUserDataAction');
    vi.spyOn(firebase, 'auth');
  });

  const hook = renderHook(() => useProfileFormSubmit(), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  const useUpdateUserInfoHook = renderHook(() => useUpdateUserInfo(), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  const useUpdateUserPreferencesHook = renderHook(() => useUpdateUserPreferences(), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  it('should call onProfileFormSubmit method', async () => {
    const { result } = hook;
    const { result: updateUserDataResult } = useUpdateUserInfoHook;
    const { result: updateUserPreferencesResult } = useUpdateUserPreferencesHook;

    const payload = {
      name: 'Mike',
      picture:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.planetware.com%2Fpictures%2Ffrance-f.htm&psig=AOvVaw16dgXLuOBEkmNotqTZeUPI&ust=1667814142817000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIC-5P2hmfsCFQAAAAAdAAAAABAE',
      defaultCurrency: Currencies.Pound,
      calculatedPrice: true,
      currentPassword: '2222',
      newPassword: '1234',
      confirmPassword: '1234',
      email: 'test@example.com',
    };

    expect(result.current.onProfileFormSubmit(payload)).rejects.toThrow();

    expect(updateUserDataResult.current.onUpdateUserInfoAndPassword(payload));
    expect(updateUserPreferencesResult.current.onUpdateUserPreferences(payload)).rejects.toThrow();
  });
});
