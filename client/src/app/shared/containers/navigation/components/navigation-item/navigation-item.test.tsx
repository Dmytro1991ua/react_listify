import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { vi } from 'vitest';

import { AppRoutes } from '../../../../../app.enums';
import { ProfileIcon, ShoppingCartIcon } from '../../navigation.styled';
import NavigationItem from './navigation-item';

vi.doMock('react-router-dom', () => {
  return {
    __esModule: true,
    useLocation: vi.fn().mockReturnValue({
      pathname: AppRoutes.ShoppingLists,
    }),
  };
});

const shoppingListRoutProps = {
  item: {
    id: uuidv4(),
    label: 'Shopping List',
    icon: <ShoppingCartIcon />,
    url: AppRoutes.ShoppingLists,
    onClick: vi.fn(),
  },
  isExpanded: false,
};

const profileRoutProps = {
  item: {
    id: uuidv4(),
    label: 'Profile',
    icon: <ProfileIcon />,
    url: AppRoutes.Profile,
    onClick: vi.fn(),
  },
  isExpanded: false,
};

describe('NavigationItem', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component with props and shopping list route without crashing', async () => {
    render(
      <MemoryRouter>
        <NavigationItem {...shoppingListRoutProps} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Shopping List/)).toBeInTheDocument());
  });

  it('should redirect to /shopping-lists route on click', async () => {
    render(
      <MemoryRouter>
        <NavigationItem {...shoppingListRoutProps} />
      </MemoryRouter>
    );

    const shoppingListLink = screen.getByRole('button', { name: /Shopping List/ });

    await act(async () => user.click(shoppingListLink));

    await waitFor(() => expect(shoppingListRoutProps.item.onClick).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(profileRoutProps.item.onClick).toHaveBeenCalledTimes(0));
  });

  it('should render component with props and profile route without crashing', async () => {
    render(
      <MemoryRouter>
        <NavigationItem {...profileRoutProps} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Profile/)).toBeInTheDocument());
  });

  it('should redirect to /profile route on click', async () => {
    render(
      <MemoryRouter>
        <NavigationItem {...profileRoutProps} />
      </MemoryRouter>
    );

    const profileLink = screen.getByRole('button', { name: /Profile/ });

    await act(async () => user.click(profileLink));

    await waitFor(() => expect(profileRoutProps.item.onClick).toHaveBeenCalledTimes(1));
  });
});
