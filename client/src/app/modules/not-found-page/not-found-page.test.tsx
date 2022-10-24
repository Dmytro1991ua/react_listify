import { act, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { vi } from 'vitest';

import { AppRoutes } from '../../app.enums';
import NotFoundPage from './not-found-page';

describe('<NotFoundPage />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component without crashing', () => {
    render(<NotFoundPage />);

    expect(screen.getByText(/Come Back Home/)).toBeInTheDocument();
  });

  it('should redirect to /shopping-lists route on button click', async () => {
    const history = createMemoryHistory();
    history.push(AppRoutes.ShoppingLists);

    render(
      <Router history={history}>
        <NotFoundPage />
      </Router>
    );
    await act(() => user.click(screen.getByRole('button')));

    expect(history.location.pathname).toBe(AppRoutes.ShoppingLists);
  });
});
