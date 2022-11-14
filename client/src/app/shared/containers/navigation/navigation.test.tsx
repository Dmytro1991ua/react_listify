import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import Navigation from './navigation';

describe('Navigation', () => {
  const Component = (): JSX.Element => (
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component without crashing', async () => {
    render(<Component />);

    await waitFor(() => expect(screen.getByText(/Listify/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Your smart grocery list/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Shopping List/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Profile/)).toBeInTheDocument());
  });

  it('should expand/collapse navigation on button click', async () => {
    render(<Component />);

    const expandButton = screen.getByRole('button', { name: /expand-btn/ });

    expect(expandButton).toBeInTheDocument();

    await act(async () => user.click(expandButton));

    await waitFor(() => expect(screen.getByText(/Your smart grocery list/)).toBeInTheDocument());
  });
});
