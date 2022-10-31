import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Currencies } from '../../../../app.enums';
import { defaultShoppingListItems } from '../../../../mocks/test-mocks';
import * as utils from '../../../../utils';
import ShoppingList from './shopping-list';

const defaultProps = {
  item: {
    currency: Currencies.Default,
    name: 'Test List',
    shoppingListItems: defaultShoppingListItems,
  },
  anchorElement: null,
  isMenuOpened: false,
  isShoppingList: true,
  calculateTotalPriceByQuantity: false,
  onMenuClose: vi.fn(),
  onMenuOpen: vi.fn(),
  onModalOpen: vi.fn(),
  onSetShoppingListId: vi.fn(),
  onRedirectToDetails: vi.fn(),
};

describe('<ShoppingList /', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(utils, 'toBuyOrPurchasedLabel').mockReturnValue(10);
    vi.spyOn(utils, 'calculateTotalPrice').mockReturnValue(30);
  });

  it('should render component with props without crashing', () => {
    render(<ShoppingList {...defaultProps} />);

    expect(screen.getByLabelText('To Buy: 10 / Purchased: 10')).toBeInTheDocument();
    expect(screen.getByText('30 $')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /menu-btn/ })).toBeInTheDocument();
  });
});
