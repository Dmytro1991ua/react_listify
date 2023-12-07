import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import AuthSignUpPage from './auth-sign-up-page';
import { CUSTOM_THEME } from '../../../cdk/theme/theme';

describe('<AuthForgotPasswordPage />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component without crashing', () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <MemoryRouter>
          <AuthSignUpPage />
        </MemoryRouter>
      </ThemeProvider>
    );

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
});
