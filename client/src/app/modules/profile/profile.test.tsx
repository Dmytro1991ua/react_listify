import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import Profile from './profile';
import { CUSTOM_THEME } from '../../cdk/theme/theme';

vi.doMock('axios');

describe('Profile', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Profile />
    </ThemeProvider>
  );

  it('should render component without crashing', () => {
    render(<Component />);

    expect(screen.getByText(/Profile/)).toBeInTheDocument();
    expect(screen.getByText(/Account Settings/)).toBeInTheDocument();
    expect(screen.getByText(/User Information/)).toBeInTheDocument();
    expect(screen.getByText(/Application Settings/)).toBeInTheDocument();
    expect(screen.getByText(/Change Application's global preferences/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });
});
