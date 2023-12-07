import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Formik } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import AuthResetPasswordForm from './auth-reset-password-form';
import { CUSTOM_THEME } from '../../../../cdk/theme/theme';

const mockOnSubmit = vi.fn();

const defaultProps = {
  initialValues: { newPassword: '' },
  validationSchema: vi.fn(),
  onSubmit: mockOnSubmit,
};

describe('<AuthForgotPasswordForm />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <MemoryRouter>
        <Formik initialValues={{}} onSubmit={() => Promise.resolve()}>
          <AuthResetPasswordForm {...defaultProps} />
        </Formik>
      </MemoryRouter>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByText(/Reset Password/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter new password/i)).toBeInTheDocument();
    expect(screen.getByText(/New Password/)).toBeInTheDocument();
  });

  it('should return a correct input value', async () => {
    const mockInputValue = '12345678';

    render(<Component />);

    const input = screen.getByPlaceholderText(/enter new password/i);

    expect(input).toBeInTheDocument();

    await act(async () => user.type(input, mockInputValue));

    await waitFor(() => expect(input.value).toBe(mockInputValue));
  });

  it('should not submit form when input value is empty', async () => {
    const mockInputValue = '';

    render(<Component />);

    const input = screen.getByPlaceholderText(/enter new password/i);

    await waitFor(() => expect(input.value).toBe(mockInputValue));

    const submitBtn = screen.getByText(/Reset Password/);

    expect(submitBtn).toBeInTheDocument();

    await act(async () => user.type(input, mockInputValue || '{tab}'));

    await waitFor(() => expect(input.value).toBe(mockInputValue));

    await act(async () => user.click(submitBtn));

    await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalled());
  });

  it('should submit form and show loader', async () => {
    const mockInputValue = '555555';

    render(<Component />);

    const input = screen.getByPlaceholderText(/enter new password/i);
    const submitBtn = screen.getByText(/Reset Password/);

    await act(async () => user.type(input, mockInputValue));

    await waitFor(() => expect(input.value).toBe(mockInputValue));

    await act(async () => user.click(submitBtn));

    await waitFor(() => expect(screen.getByTestId('watch-loading')).toBeInTheDocument());
  });
});
