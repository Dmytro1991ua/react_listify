import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { CUSTOM_THEME } from '../../../cdk/theme/theme';
import AuthForgotPasswordPage from './auth-forgot-password-page';

describe('<AuthForgotPasswordPage />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component without crashing', () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <MemoryRouter>
          <AuthForgotPasswordPage />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Listify application. Stay tuned and let's roll/)).toBeInTheDocument();
    expect(screen.getAllByText(/Listify/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Listify/)[1]).toBeInTheDocument();
    expect(screen.getByText(/Your perfect choice for shopping/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Already have an account?/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Do not have an account?/ })).toBeInTheDocument();
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /formik-input/ })).toBeInTheDocument();
    expect(screen.getByText(/Email/)).toBeInTheDocument();
  });
});
