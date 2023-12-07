import { ThemeProvider } from '@mui/material';
import { act, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import ProfileChangePasswordFields from './profile-change-password-fields';
import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../../mocks/test-mocks';

describe('<ProfileChangePasswordFields/>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <ProfileChangePasswordFields formikInstance={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance} />
      </FormikProvider>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByPlaceholderText(/enter current password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter new password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm new password/i)).toBeInTheDocument();
  });

  it('should return correct value from current password input', async () => {
    const mockCurrentPasswordValue = '93799992';

    render(<Component />);

    const currentPasswordInput = screen.getByPlaceholderText(/enter current password/i);

    await act(async () => user.type(currentPasswordInput, mockCurrentPasswordValue));

    expect(currentPasswordInput.value).toBe(mockCurrentPasswordValue);
  });

  it('should return correct value from new password input', async () => {
    const mockNewPasswordValue = '12345678';

    render(<Component />);

    const newPasswordInput = screen.getByPlaceholderText(/enter new password/i);

    await act(async () => user.type(newPasswordInput, mockNewPasswordValue));

    expect(newPasswordInput.value).toBe(mockNewPasswordValue);
  });

  it('should return correct value from confirm password input', async () => {
    const mockConfirmPasswordValue = '12345678';

    render(<Component />);

    const confirmPasswordInput = screen.getByPlaceholderText(/confirm new password/i);

    await act(async () => user.type(confirmPasswordInput, mockConfirmPasswordValue));

    expect(confirmPasswordInput.value).toBe(mockConfirmPasswordValue);
  });
});
