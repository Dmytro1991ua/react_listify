import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, vi } from 'vitest';

import { AppRoutes } from '../../../app.enums';
import Header from './header';

vi.doMock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: vi.fn().mockReturnValue({
    pathname: AppRoutes.ShoppingLists,
  }),
  Link: vi.fn(),
}));

describe('Header', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const Component = (): JSX.Element => (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component without crashing', () => {
    render(<Component />);

    expect(screen.getByText(/Listify/)).toBeInTheDocument();
  });

  it('should navigate to /shopping-lists route on button click', async () => {
    render(<Component />);

    const logo = screen.getByTestId('logo');

    expect(logo).toBeInTheDocument();

    await act(async () => user.click(logo));

    expect(logo).toHaveAttribute('href', AppRoutes.ShoppingLists);
  });

  it('should open dropdown menu on button click', async () => {
    render(<Component />);

    const menuButton = screen.getByTestId('menu-btn');

    await waitFor(() => expect(menuButton).toBeInTheDocument());

    await act(async () => user.click(menuButton));

    await waitFor(() => expect(screen.getByText(/Profile/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Logout/)).toBeInTheDocument());
  });

  it('should redirect to Profile page on button click', async () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: AppRoutes.Profile },
      writable: true,
    });

    render(<Component />);

    const menuButton = screen.getByTestId('menu-btn');

    expect(menuButton).toBeInTheDocument();

    await waitFor(() => expect(menuButton).toBeInTheDocument());

    await act(async () => user.click(menuButton));

    await waitFor(() => expect(screen.getByText(/Profile/)).toBeInTheDocument());

    await act(async () => user.click(screen.getByText(/Profile/)));

    await waitFor(() => expect(window.location.pathname).toBe(AppRoutes.Profile));
  });

  it('should redirect to Login page on button click', async () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: AppRoutes.SignIn },
      writable: true,
    });

    render(<Component />);

    const menuButton = screen.getByTestId('menu-btn');

    expect(menuButton).toBeInTheDocument();

    await waitFor(() => expect(menuButton).toBeInTheDocument());

    await act(async () => user.click(menuButton));

    await waitFor(() => expect(screen.getByText(/Logout/)).toBeInTheDocument());

    await act(async () => user.click(screen.getByText(/Logout/)));

    await waitFor(() => expect(window.location.pathname).toBe(AppRoutes.SignIn));
  });
});
