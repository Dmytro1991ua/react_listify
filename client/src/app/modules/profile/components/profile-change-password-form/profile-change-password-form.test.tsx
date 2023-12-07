import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import ProfileChangePasswordForm from './profile-change-password-form';
import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../../mocks/test-mocks';

describe('<ProfileChangePasswordForm />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <ProfileChangePasswordForm formikInstance={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance} />
      </FormikProvider>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByPlaceholderText(/enter current password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter new password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm new password/i)).toBeInTheDocument();
  });
});
