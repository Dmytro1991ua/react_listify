import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Currencies, ProductUnits } from '../../../../app.enums';
import ProductItem from './product-item';

const mockOnDelete = vi.fn();
const mockOnEdit = vi.fn();
const mockOnClick = vi.fn();

const defaultProps = {
  item: { _id: '1', name: 'Apple', quantity: 2, units: ProductUnits.Kilogram, price: 12, isChecked: false },
  currency: Currencies.Dollar,
  calculateTotalPriceByQuantity: false,
  isShoppingList: false,
  onDelete: mockOnDelete,
  onEdit: mockOnEdit,
  onClick: mockOnClick,
};

describe('<ProductItem /', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component with props without crashing', () => {
    render(<ProductItem {...defaultProps} />);

    expect(screen.getByText(/Apple/)).toBeInTheDocument();
    expect(screen.getByText('2 Kg')).toBeInTheDocument();
    expect(screen.getByText('12 $')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit-btn/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete-btn/ })).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});
