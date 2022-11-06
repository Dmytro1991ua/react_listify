import { renderHook } from '@testing-library/react-hooks';
import { FormikProvider } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';

import { Currencies } from '../../../app.enums';
import firebase from '../../../configs/firebase';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../mocks/test-mocks';
import { authService } from '../../auth/auth.service';
import { useUpdateUserPreferences } from './useUpdateUserPreferences';

describe('useUpdateUserPreferences', () => {
  let updateUserPreferencesSpy: SpyInstance<[currentPassword: string, newPassword: string], Promise<void>>;

  beforeEach(() => {
    vi.resetAllMocks();
    updateUserPreferencesSpy = vi.spyOn(authService, 'changeUserPassword');
    vi.spyOn(firebase, 'auth');
  });

  const hook = renderHook(() => useUpdateUserPreferences(), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>{children}</FormikProvider>
      </MemoryRouter>
    ),
  });

  it('should call onProfileFormSubmit method', async () => {
    const { result } = hook;

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

    expect(result.current.onUpdateUserPreferences(payload)).rejects.toThrow();

    expect(updateUserPreferencesSpy).toHaveBeenCalled();
  });
});
