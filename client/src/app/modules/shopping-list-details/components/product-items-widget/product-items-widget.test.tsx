import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Currencies } from '../../../../app.enums';
import { defaultShoppingListItems } from '../../../../mocks/test-mocks';
import ProductItemsWidget from './product-items-widget';

const defaultProps = {
  currency: Currencies.Dollar,
  shoppingListItems: defaultShoppingListItems,
};

describe('<ProductItemsWidget', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render product with props without crashing', () => {
    render(<ProductItemsWidget {...defaultProps} />);

    expect(screen.getByText(/To Buy:/)).toBeInTheDocument();
    expect(screen.getByText(/Purchased:/)).toBeInTheDocument();
    expect(screen.getByText('16 $')).toBeInTheDocument();
    expect(screen.getByText('9 $')).toBeInTheDocument();
  });
});
