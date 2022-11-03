import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Formik } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { AppRoutes } from '../../../../app.enums';
import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import AuthSignUpForm from './auth-sign-up-form';

const mockOnSubmit = vi.fn();
const mockOnSubmitViaGoogle = vi.fn();

const defaultProps = {
  initialValues: { name: '', email: '', password: '', confirmPassword: '' },
  validationSchema: vi.fn(),
  onSubmit: mockOnSubmit,
  onSubmitViaGoogle: mockOnSubmitViaGoogle,
  isSignInViaGoogleLoading: false,
};

describe('<AuthSignUpForm />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <MemoryRouter>
        <Formik initialValues={{}} onSubmit={() => Promise.resolve()}>
          <AuthSignUpForm {...defaultProps} />
        </Formik>
      </MemoryRouter>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    const passwordLabel = screen.getByTestId('password');
    const confirmPasswordLabel = screen.getByTestId('confirm-password');

    expect(screen.getByRole('link', { name: /Already have have an account?/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'submit-btn' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'google-submit-btn' })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm the password/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(/Email/)).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  it('should return a correct inputs value', async () => {
    const mockName = 'Alex';
    const mockEmail = 'alex2021new1666@gmail.com';
    const mockPassword = '123456';
    const mockConfirmPassword = '123456';

    render(<Component />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm the password/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();

    await act(async () => user.type(nameInput, mockName));
    await act(async () => user.type(emailInput, mockEmail));
    await act(async () => user.type(passwordInput, mockPassword));
    await act(async () => user.type(confirmPasswordInput, mockConfirmPassword));

    await waitFor(() => expect(nameInput.value).toBe(mockName));
    await waitFor(() => expect(emailInput.value).toBe(mockEmail));
    await waitFor(() => expect(passwordInput.value).toBe(mockPassword));
    await waitFor(() => expect(confirmPasswordInput.value).toBe(mockConfirmPassword));
  });

  it('should not submit form when inputs value are empty', async () => {
    const mockName = '';
    const mockEmail = '';
    const mockPassword = '';
    const mockConfirmPassword = '';

    render(<Component />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm the password/i);

    await act(async () => user.type(nameInput, mockEmail || '{tab}'));
    await act(async () => user.type(emailInput, mockEmail || '{tab}'));
    await act(async () => user.type(passwordInput, mockPassword || '{tab}'));
    await act(async () => user.type(confirmPasswordInput, mockPassword || '{tab}'));

    await waitFor(() => expect(nameInput.value).toBe(mockName));
    await waitFor(() => expect(emailInput.value).toBe(mockEmail));
    await waitFor(() => expect(passwordInput.value).toBe(mockPassword));
    await waitFor(() => expect(confirmPasswordInput.value).toBe(mockConfirmPassword));

    const submitBtn = screen.getByRole('button', { name: 'submit-btn' });

    expect(submitBtn).toBeInTheDocument();

    await act(async () => user.click(submitBtn));

    await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalled());
  });

  it('should sign in via Google', async () => {
    render(<Component />);

    const submitBtn = screen.getByRole('button', { name: 'google-submit-btn' });

    expect(submitBtn).toBeInTheDocument();

    await act(async () => user.click(submitBtn));

    expect(mockOnSubmitViaGoogle).toHaveBeenCalled();
  });

  it('should show loader spinner on form submit', async () => {
    const mockName = 'Alex';
    const mockEmail = 'alex2021new1666@gmail.com';
    const mockPassword = '123456';
    const mockConfirmPassword = '123456';

    render(<Component />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm the password/i);

    await act(async () => user.type(nameInput, mockName));
    await act(async () => user.type(emailInput, mockEmail));
    await act(async () => user.type(passwordInput, mockPassword));
    await act(async () => user.type(confirmPasswordInput, mockConfirmPassword));

    await waitFor(() => expect(nameInput.value).toBe(mockName));
    await waitFor(() => expect(emailInput.value).toBe(mockEmail));
    await waitFor(() => expect(passwordInput.value).toBe(mockPassword));
    await waitFor(() => expect(confirmPasswordInput.value).toBe(mockConfirmPassword));

    const submitBtn = screen.getByRole('button', { name: 'submit-btn' });

    await act(async () => user.click(submitBtn));

    await waitFor(() => expect(screen.getByTestId('grid-loading')).toBeInTheDocument());
  });

  it('should show loader spinner on form submit via Google', async () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <MemoryRouter>
          <Formik initialValues={{}} onSubmit={() => Promise.resolve()}>
            <AuthSignUpForm {...defaultProps} isSignInViaGoogleLoading={true} />
          </Formik>
        </MemoryRouter>
      </ThemeProvider>
    );

    await waitFor(() => expect(screen.getByTestId('grid-loading')).toBeInTheDocument());
  });

  it('should redirect to Sign In page on button click', async () => {
    render(<Component />);

    const signInLink = screen.getByText('Already have have an account?');

    expect(signInLink).toBeInTheDocument();

    await act(async () => user.click(signInLink));

    await waitFor(() => expect(signInLink).toHaveAttribute('href', AppRoutes.SignIn));
  });
});
