import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { vi } from 'vitest';

import Switch from './switch';

const mockOnChange = vi.fn();

const defaultProps = {
  checked: false,
  name: 'Test name',
  disabled: false,
  onChange: mockOnChange,
};

describe('<FormikSelect>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component with props without crashing', () => {
    render(<Switch {...defaultProps} size='medium' />);

    const switcher = screen.getByRole('checkbox');

    expect(switcher).toBeInTheDocument();
  });

  it('should switch value on Switch click', async () => {
    render(<Switch {...defaultProps} size='medium' />);

    const switcher = screen.getByRole('checkbox');

    act(() => user.click(switcher));

    await waitFor(() => expect(mockOnChange).toHaveBeenCalled());
  });
});
