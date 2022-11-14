import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { AppRoutes } from '../../../app.enums';
import LayoutWithNavigationAndHeader from './layout-with-navigation-and-header';

vi.doMock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: vi.fn().mockReturnValue({
    pathname: AppRoutes.ShoppingLists,
  }),
  Link: vi.fn(),
}));

const defaultProps = {
  children: <p>Children</p>,
};

describe('Layout with navigation and header', () => {
  const Component = (): JSX.Element => (
    <MemoryRouter>
      <LayoutWithNavigationAndHeader {...defaultProps} />
    </MemoryRouter>
  );

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render components with props without crashing', async () => {
    render(<Component />);

    await waitFor(() => expect(screen.getAllByText(/Listify/)[0]).toBeInTheDocument());
    await waitFor(() => expect(screen.getAllByText(/Listify/)[1]).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Your smart grocery list/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Shopping List/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Profile/)).toBeInTheDocument());
  });
});
