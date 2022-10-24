import { ThemeProvider } from '@mui/material';
import { act, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../../mocks/test-mocks';
import ProfileUserInformationFields from './profile-user-information-fields';

describe('<ProfileUserInformationFields/>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <ProfileUserInformationFields formikInstance={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance} />
      </FormikProvider>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
  });

  it('should have disabled property on email input', async () => {
    render(<Component />);

    const emailInput = screen.getByPlaceholderText(/enter your email/i);

    expect(emailInput).toHaveAttribute('disabled');
  });

  it('should return correct value from name input', async () => {
    const mockNameValue = 'Alex Smith';

    render(<Component />);

    const nameInput = screen.getByPlaceholderText(/enter your name/i);

    await act(async () => user.type(nameInput, mockNameValue));

    expect(nameInput.value).toBe(mockNameValue);
  });
});
