import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Formik } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import AuthSignInForm from './auth-sign-in-form';
import { AppRoutes } from '../../../../app.enums';
import { CUSTOM_THEME } from '../../../../cdk/theme/theme';

const mockOnSubmit = vi.fn();
const mockOnSubmitViaGoogle = vi.fn();

const defaultProps = {
  initialValues: { email: '', password: '' },
  validationSchema: vi.fn(),
  onSubmit: vi.fn(),
  onSubmitViaGoogle: vi.fn(),
  isSignInViaGoogleLoading: false,
};

describe('<AuthSignInForm />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (props = defaultProps): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <MemoryRouter>
        <Formik initialValues={{}} onSubmit={() => Promise.resolve()}>
          <AuthSignInForm {...props} />
        </Formik>
      </MemoryRouter>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByRole('link', { name: /Forgot password?/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Do not have an account?/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'submit-btn' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'google-submit-btn' })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/)).toBeInTheDocument();
    expect(screen.getByText(/Password/)).toBeInTheDocument();
  });

  it('should return a correct inputs value', async () => {
    const mockEmail = 'alex2021new1666@gmail.com';
    const mockPassword = '123456';

    render(<Component />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await act(async () => user.type(emailInput, mockEmail));
    await act(async () => user.type(passwordInput, mockPassword));

    await waitFor(() => expect(emailInput.value).toBe(mockEmail));
    await waitFor(() => expect(passwordInput.value).toBe(mockPassword));
  });

  it.skip('should not submit form when inputs value are empty', async () => {
    const mockEmail = '';
    const mockPassword = '';

    render(<Component onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await act(async () => user.type(emailInput, mockEmail || '{tab}'));
    await act(async () => user.type(passwordInput, mockPassword || '{tab}'));

    await waitFor(() => expect(emailInput.value).toBe(mockEmail));
    await waitFor(() => expect(passwordInput.value).toBe(mockPassword));

    const submitBtn = screen.getByRole('button', { name: 'submit-btn' });

    expect(submitBtn).toBeInTheDocument();

    await act(async () => user.click(submitBtn));

    await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalled());
  });

  it('should sign in via Google', async () => {
    render(<Component onSubmitViaGoogle={mockOnSubmitViaGoogle} />);

    const submitBtn = screen.getByRole('button', { name: 'google-submit-btn' });

    expect(submitBtn).toBeInTheDocument();

    await act(async () => user.click(submitBtn));

    await waitFor(() => expect(mockOnSubmitViaGoogle).toHaveBeenCalled());
  });

  it.skip('should show loader spinner on form submit', async () => {
    const mockEmail = 'alex2021new1666@gmail.com';
    const mockPassword = '123456';

    render(<Component onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await act(async () => user.type(emailInput, mockEmail));
    await act(async () => user.type(passwordInput, mockPassword));

    await waitFor(() => expect(emailInput.value).toBe(mockEmail));
    await waitFor(() => expect(passwordInput.value).toBe(mockPassword));

    const submitBtn = screen.getByRole('button', { name: 'submit-btn' });

    await act(async () => user.click(submitBtn));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it('should show loader spinner on form submit via Google', async () => {
    render(<Component isSignInViaGoogleLoading={true} />);

    await waitFor(() => expect(screen.getByTestId('ball-triangle-loading')).toBeInTheDocument());
  });

  it('should redirect to Forgot Password page on button click', async () => {
    render(<Component />);

    const forgotPasswordLink = screen.getByText('Forgot password?');

    expect(forgotPasswordLink).toBeInTheDocument();

    await act(async () => user.click(forgotPasswordLink));

    await waitFor(() => expect(forgotPasswordLink).toHaveAttribute('href', AppRoutes.ForgotPassword));
  });

  it('should redirect to Sign Up page on button click', async () => {
    render(<Component />);

    const signUpLink = screen.getByText('Do not have an account?');

    expect(signUpLink).toBeInTheDocument();

    await act(async () => user.click(signUpLink));

    await waitFor(() => expect(signUpLink).toHaveAttribute('href', AppRoutes.SignUp));
  });
});
