import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { expect, vi } from 'vitest';

import CardActionsContent from './card-actions-content';

const defaultProps = {
  isMenuOpened: false,
  isShoppingList: false,
  shoppingListId: '1',
  isSelected: false,
  onMenuOpen: vi.fn(),
  onMenuClose: vi.fn(),
  onEdit: vi.fn(),
  onDelete: vi.fn(),
  onModalOpen: vi.fn(),
  onRedirectToDetails: vi.fn(),
  onSetShoppingListId: vi.fn(),
};

describe('<CardActionsContent', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component with props without crashing', () => {
    render(<CardActionsContent {...defaultProps} />);
  });

  it('should render actions for shopping list card', async () => {
    const isShoppingList = true;
    const mockOnMenuOpen = vi.fn();

    render(<CardActionsContent {...defaultProps} isShoppingList={isShoppingList} onMenuOpen={mockOnMenuOpen} />);

    const menuBtn = screen.getByRole('button', { name: /menu-btn/ });

    await waitFor(() => expect(menuBtn).toBeInTheDocument());

    await act(async () => user.click(menuBtn));

    await waitFor(() => expect(mockOnMenuOpen).toHaveBeenCalledTimes(1));
  });

  it('should open dropdown menu when isMenuOpened prop is true', async () => {
    const isShoppingList = true;
    const isMenuOpened = true;

    render(<CardActionsContent {...defaultProps} isMenuOpened={isMenuOpened} isShoppingList={isShoppingList} />);

    expect(screen.getByText(/Open/)).toBeInTheDocument();
    expect(screen.getByText(/Delete/)).toBeInTheDocument();
  });

  it('should close dropdown when isMenuOpened prop is false', async () => {
    const isShoppingList = true;
    const isMenuOpened = false;

    render(<CardActionsContent {...defaultProps} isMenuOpened={isMenuOpened} isShoppingList={isShoppingList} />);

    const menuBtn = screen.getByRole('button', { name: /menu-btn/ });

    await waitFor(() => expect(menuBtn).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/Open/)).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/Delete/)).not.toBeInTheDocument());
  });

  it('should render actions for shopping list details card', async () => {
    render(<CardActionsContent {...defaultProps} />);

    const editBtn = screen.getByRole('button', { name: /edit-btn/ });
    const deleteBtn = screen.getByRole('button', { name: /delete-btn/ });

    await waitFor(() => expect(editBtn).toBeInTheDocument());
    await waitFor(() => expect(deleteBtn).toBeInTheDocument());

    await act(async () => user.click(editBtn));
    await act(async () => user.click(deleteBtn));

    await waitFor(() => expect(defaultProps.onEdit).toHaveBeenCalled());
    await waitFor(() => expect(defaultProps.onDelete).toHaveBeenCalled());
  });
});
