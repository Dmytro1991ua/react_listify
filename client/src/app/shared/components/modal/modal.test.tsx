import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { expect, vi } from 'vitest';

import Modal from './modal';

const defaultProps = {
  open: true,
  children: <p>Test Children</p>,
  fullWidth: true,
  primaryBtnLabel: 'Submit',
  secondaryBtnLabel: 'Cancel',
  title: 'Test Modal',
  isDirty: false,
  onClose: vi.fn(),
  onSubmit: vi.fn(),
};

describe('<FormikInput />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component without crashing', async () => {
    render(<Modal {...defaultProps} />);

    await waitFor(() => expect(screen.getByText(/Test Modal/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Submit/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Cancel/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Test Children/)).toBeInTheDocument());
  });

  it('should close modal on backdrop click', async () => {
    const mockOnModalClose = vi.fn();

    render(<Modal {...defaultProps} onClose={mockOnModalClose} />);

    const backdrop = screen.getAllByRole('presentation')[1];

    expect(backdrop).toBeInTheDocument();

    act(() => user.click(backdrop));

    await waitFor(() => expect(mockOnModalClose).toHaveBeenCalledTimes(1));
  });

  it('should close modal on close button click', async () => {
    const mockOnModalClose = vi.fn();

    render(<Modal {...defaultProps} onClose={mockOnModalClose} />);

    const closeBtn = screen.getByRole('button', { name: /close-btn/ });

    expect(closeBtn).toBeInTheDocument();

    act(() => user.click(closeBtn));

    await waitFor(() => expect(mockOnModalClose).toHaveBeenCalledTimes(1));
  });

  it('should close modal on Cancel button click', async () => {
    const mockOnModalClose = vi.fn();

    render(<Modal {...defaultProps} onClose={mockOnModalClose} />);

    const cancelBtn = screen.getByText(/Cancel/);

    expect(cancelBtn).toBeInTheDocument();

    act(() => user.click(cancelBtn));

    await waitFor(() => expect(mockOnModalClose).toHaveBeenCalledTimes(1));
  });
});
