import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { CUSTOM_THEME } from '../../../cdk/theme/theme';
import AuthSignInPage from './auth-sign-in-page';

describe('<AuthForgotPasswordPage />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component without crashing', () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <MemoryRouter>
          <AuthSignInPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Listify application. Stay tuned and let's roll/)).toBeInTheDocument();
    expect(screen.getAllByText(/Listify/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Listify/)[1]).toBeInTheDocument();
    expect(screen.getByText(/Your perfect choice for shopping/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'submit-btn' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'google-submit-btn' })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/)).toBeInTheDocument();
    expect(screen.getByText(/Password/)).toBeInTheDocument();
  });
});
