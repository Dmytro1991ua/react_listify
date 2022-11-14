import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { CUSTOM_THEME } from '../../../cdk/theme/theme';
import AuthResetPasswordPage from './auth-reset-password-page';

describe('<AuthForgotPasswordPage />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component without crashing', () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <MemoryRouter>
          <AuthResetPasswordPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Listify application. Stay tuned and let's roll/)).toBeInTheDocument();
    expect(screen.getAllByText(/Listify/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Listify/)[1]).toBeInTheDocument();
    expect(screen.getByText(/Your perfect choice for shopping and creating the best grocery list/)).toBeInTheDocument();
    expect(screen.getByText(/Reset Password/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter new password/i)).toBeInTheDocument();
    expect(screen.getByText(/New Password/)).toBeInTheDocument();
  });
});
