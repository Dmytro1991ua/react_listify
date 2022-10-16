import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { vi } from 'vitest';

import Button from './button';

const defaultProps = {
  ariaLabel: 'Test label',
  children: <p>Children</p>,
  disabled: false,
  fullWidth: true,
  startIcon: vi.fn(),
  endIcon: vi.fn(),
  onClick: vi.fn(),
};

describe('<Button />', () => {
  it('should render component with props without crashing', () => {
    render(
      <Button {...defaultProps} type='submit' variant='primaryContained'>
        Test Btn
      </Button>
    );

    expect(screen.getByText(/Test Btn/)).toBeInTheDocument();
  });

  it('should do some action on click', async () => {
    const mockOnClick = vi.fn();

    render(
      <Button {...defaultProps} type='submit' variant='primaryContained' onClick={mockOnClick}>
        Test Btn
      </Button>
    );

    const btn = screen.getByRole('button');

    act(() => user.click(btn));

    await waitFor(() => expect(mockOnClick).toHaveBeenCalledTimes(1));
  });
});
