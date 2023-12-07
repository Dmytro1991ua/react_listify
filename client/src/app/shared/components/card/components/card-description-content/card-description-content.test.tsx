import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { vi } from 'vitest';

import CardDescriptionContent from './card-description-content';
import { Currencies } from '../../../../../app.enums';

const defaultProps = {
  quantity: 0,
  totalPrice: 0,
  price: 0,
  units: 'units',
  currency: Currencies.Dollar,
  isShoppingList: false,
  toBuyLabel: 0,
  toPurchasedLabel: 0,
};

describe('<CardDescriptionContent/>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render components with props without crashing', () => {
    render(<CardDescriptionContent {...defaultProps} />);

    expect(screen.getByText('0 units')).toBeInTheDocument();
    expect(screen.getByText('0 $')).toBeInTheDocument();
  });

  it('should show To Buy and Purchased info on hover', async () => {
    const isShoppingList = true;

    render(<CardDescriptionContent {...defaultProps} isShoppingList={isShoppingList} />);

    const productQuantityLabel = screen.getByTestId('product-quantity');

    expect(productQuantityLabel).toBeInTheDocument();

    user.hover(productQuantityLabel);

    expect(await screen.findByText('To Buy: 0 / Purchased: 0')).toBeInTheDocument();
  });

  it('should display a particular unit instead of word "units"', () => {
    render(<CardDescriptionContent {...defaultProps} quantity={10} units='L' />);

    const unitQuantityLabel = screen.getByTestId('unit-quantity');

    expect(unitQuantityLabel).toBeInTheDocument();
    expect(screen.getByText('10 L')).toBeInTheDocument();
  });
});
