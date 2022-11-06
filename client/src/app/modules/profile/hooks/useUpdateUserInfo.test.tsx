import { renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';

import { Currencies } from '../../../app.enums';
import { UpdateUserInformation } from '../../../app.interfaces';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../mocks/test-mocks';
import * as authActions from '../../auth/auth.actions';
import { authService } from '../../auth/auth.service';
import { useUpdateUserInfo } from './useUpdateUserInfo';

describe('useUpdateUserInfo', () => {
  let updateUserDataActionSpy: SpyInstance<[userData: UpdateUserInformation], Promise<void>>;

  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(authService, 'updateUserData');
    updateUserDataActionSpy = vi.spyOn(authActions, 'updateUserDataAction');
  });

  const hook = renderHook(() => useUpdateUserInfo(), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  it('should call onUpdateUserInfoAndPassword method', async () => {
    const { result } = hook;

    const payload = {
      name: 'Mike',
      picture:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.planetware.com%2Fpictures%2Ffrance-f.htm&psig=AOvVaw16dgXLuOBEkmNotqTZeUPI&ust=1667814142817000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIC-5P2hmfsCFQAAAAAdAAAAABAE',
      defaultCurrency: Currencies.Pound,
      calculatedPrice: true,
      email: 'test@example.com',
    };

    expect(result.current.onUpdateUserInfoAndPassword(payload));

    expect(updateUserDataActionSpy).toHaveBeenCalled();
  });

  it('should not call onUpdateUserInfoAndPassword method if currentPassword, newPassword and confirmPassword values were passed', async () => {
    const { result } = hook;

    const payload = {
      name: 'Mike',
      picture:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.planetware.com%2Fpictures%2Ffrance-f.htm&psig=AOvVaw16dgXLuOBEkmNotqTZeUPI&ust=1667814142817000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIC-5P2hmfsCFQAAAAAdAAAAABAE',
      defaultCurrency: Currencies.Pound,
      calculatedPrice: true,
      currentPassword: '1111',
      newPassword: '2222',
      confirmPassword: '2222',
      email: 'test@example.com',
    };

    expect(result.current.onUpdateUserInfoAndPassword(payload));

    expect(updateUserDataActionSpy).not.toHaveBeenCalled();
  });
});
