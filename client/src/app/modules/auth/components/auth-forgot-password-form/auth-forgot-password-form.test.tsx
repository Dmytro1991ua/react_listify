import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Formik } from 'formik';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { AppRoutes } from '../../../../app.enums';
import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import AuthForgotPasswordForm from './auth-forgot-password-form';

const mockOnSubmit = vi.fn();

const defaultProps = {
  initialValues: { email: '' },
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
          <AuthForgotPasswordForm {...defaultProps} />
        </Formik>
      </MemoryRouter>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByRole('link', { name: /Already have an account?/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Do not have an account?/ })).toBeInTheDocument();
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /formik-input/ })).toBeInTheDocument();
    expect(screen.getByText(/Email/)).toBeInTheDocument();
  });

  it('should return a correct input value', async () => {
    const mockInputValue = 'alex2021new1666@gmail.com';

    render(<Component />);

    const input = screen.getByRole('textbox', { name: /formik-input/ });

    expect(input).toBeInTheDocument();

    await act(async () => user.type(input, mockInputValue));

    await waitFor(() => expect(input.value).toBe(mockInputValue));
  });

  it('should not submit form when input value is empty', async () => {
    const mockInputValue = '';

    render(<Component />);

    const input = screen.getByRole('textbox', { name: /formik-input/ });

    await waitFor(() => expect(input.value).toBe(mockInputValue));

    const submitBtn = screen.getByText(/Submit/);

    expect(submitBtn).toBeInTheDocument();

    await act(async () => user.type(input, mockInputValue || '{tab}'));

    await waitFor(() => expect(input.value).toBe(mockInputValue));

    await act(async () => user.click(submitBtn));

    await waitFor(() => expect(mockOnSubmit).not.toHaveBeenCalled());
  });

  it('should submit form and show loader', async () => {
    const mockInputValue = 'alex2021new1666@gmail.com';

    render(<Component />);

    const input = screen.getByRole('textbox', { name: /formik-input/ });
    const submitBtn = screen.getByText(/Submit/);

    await act(async () => user.type(input, mockInputValue));

    await waitFor(() => expect(input.value).toBe(mockInputValue));

    await act(async () => user.click(submitBtn));

    await waitFor(() => expect(screen.getByTestId('rings-loading')).toBeInTheDocument());
  });

  it('should redirect to Sign In page on button click', async () => {
    render(<Component />);

    const signInLink = screen.getByText('Already have an account?');

    expect(signInLink).toBeInTheDocument();

    await act(async () => user.click(signInLink));

    await waitFor(() => expect(signInLink).toHaveAttribute('href', AppRoutes.SignIn));
  });

  it('should redirect to Sign Up page on button click', async () => {
    render(<Component />);

    const signUpLink = screen.getByText('Do not have an account?');

    expect(signUpLink).toBeInTheDocument();

    await act(async () => user.click(signUpLink));

    await waitFor(() => expect(signUpLink).toHaveAttribute('href', AppRoutes.SignUp));
  });
});
