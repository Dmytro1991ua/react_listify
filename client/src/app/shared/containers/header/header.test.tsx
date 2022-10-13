import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { AppRoutes } from '../../../app.enums';
import Header from './header';

vi.doMock('react-router-dom', () => {
  return {
    __esModule: true,
    useLocation: vi.fn().mockReturnValue({
      pathname: AppRoutes.ShoppingLists,
    }),
    Link: vi.fn(),
  };
});

describe('Header', () => {
  const Component = (): JSX.Element => (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  it('should render component without crashing', () => {
    render(<Component />);

    expect(screen.getByText(/Listify/)).toBeInTheDocument();
  });

  it('should navigate to /shopping-lists route on button click', async () => {
    render(<Component />);

    const logo = screen.getByTestId('logo');

    expect(logo).toBeInTheDocument();

    act(() => user.click(logo));

    expect(logo).toHaveAttribute('href', '/shopping-lists');
  });

  it('should open dropdown menu on button click', async () => {
    render(<Component />);

    const menuButton = screen.getByTestId('menu-btn');

    expect(menuButton).toBeInTheDocument();

    await waitFor(() => expect(menuButton).toBeInTheDocument());

    act(() => user.click(menuButton));

    await waitFor(() => expect(screen.getByText(/Profile/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Logout/)).toBeInTheDocument());
  });

  it('should redirect to Profile page on button click', async () => {
    render(<Component />);

    const menuButton = screen.getByTestId('menu-btn');

    expect(menuButton).toBeInTheDocument();

    await waitFor(() => expect(menuButton).toBeInTheDocument());

    act(() => user.click(menuButton));

    await waitFor(() => expect(screen.getByText(/Profile/)).toBeInTheDocument());

    act(() => user.click(screen.getByText(/Profile/)));

    await waitFor(() => expect(window.location.pathname).toBe(AppRoutes.Profile));
  });

  it('should redirect to Login page on button click', async () => {
    render(<Component />);

    const menuButton = screen.getByTestId('menu-btn');

    expect(menuButton).toBeInTheDocument();

    await waitFor(() => expect(menuButton).toBeInTheDocument());

    act(() => user.click(menuButton));

    await waitFor(() => expect(screen.getByText(/Logout/)).toBeInTheDocument());

    act(() => user.click(screen.getByText(/Logout/)));

    await waitFor(() => expect(window.location.pathname).toBe(AppRoutes.SignIn));
  });
});
