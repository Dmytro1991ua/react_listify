import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { vi } from 'vitest';

import Card from './card';

const defaultProps = {
  title: 'Test Title',
  description: 'Test description',
  actions: (
    <>
      <button>Edit</button>
      <button>Delete</button>
    </>
  ),
  productItemId: '1',
  shoppingListId: '2',
  isSelected: false,
  onClick: vi.fn(),
  onDoubleClick: vi.fn(),
};

const shoppingListCard = {
  title: 'Test Shopping List Card Title',
  description: 'Test Shopping List Card description',
  actions: <button>Shipping List Card Menu</button>,
  shoppingListId: '22',
  isSelected: false,
};

const shoppingListDetailsCard = {
  title: 'Test Shopping List Details Card Title',
  description: 'Test Shopping List Details Card description',
  actions: <button>Shipping List Details Card Menu</button>,
  productItemId: '11',
  isSelected: true,
};

describe('<Card />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const mockDoubleClick = vi.fn();
  const mockOnClick = vi.fn();

  it('should render card without crashing', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText(/Test Title/)).toBeInTheDocument();
    expect(screen.getByText(/Test description/)).toBeInTheDocument();
    expect(screen.getByText(/Edit/)).toBeInTheDocument();
    expect(screen.getByText(/Delete/)).toBeInTheDocument();
  });

  it('should redirect to shopping list details page on double click', async () => {
    render(<Card {...shoppingListCard} onDoubleClick={mockDoubleClick} />);

    const card = screen.getByTestId('card');

    act(() => user.dblClick(card));

    await waitFor(() => expect(mockDoubleClick).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText(/Test Shopping List Card Title/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Test Shopping List Card description/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Shipping List Card Menu/)).toBeInTheDocument());
    await waitFor(() => expect(shoppingListCard.shoppingListId).toBe('22'));
    await waitFor(() => expect(mockOnClick).not.toHaveBeenCalled());
  });

  it('should select shopping list card on click', async () => {
    render(<Card {...shoppingListDetailsCard} onClick={mockOnClick} />);

    const card = screen.getByTestId('card');

    act(() => user.click(card));

    await waitFor(() => expect(mockOnClick).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText(/Test Shopping List Details Card Title/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Test Shopping List Details Card description/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Shipping List Details Card Menu/)).toBeInTheDocument());
    await waitFor(() => expect(shoppingListDetailsCard.productItemId).toBe('11'));
    await waitFor(() => expect(shoppingListDetailsCard.isSelected).toBe(true));
  });
});
