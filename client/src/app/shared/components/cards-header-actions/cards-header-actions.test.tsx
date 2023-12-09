import { fireEvent, render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';

import CardsHeaderActions from './cards-header-actions';
import * as hooks from './hooks/useDeleteAllItemsModal';

describe('<CardsHeaderACtions />', () => {
  const mockDefaultProps = {
    isChecked: false,
    isDisabled: false,
    indeterminate: false,
    buttonLabel: 'Test Button label',
    customSize: '3rem',
    checkboxLabel: 'Test Checkbox label',
    modalTitle: 'Test Modal title',
    onClick: vi.fn(),
    onToggle: vi.fn(),
  };

  it('should render component without crashing', () => {
    render(<CardsHeaderActions {...mockDefaultProps} />);

    expect(screen.getByText('Test Button label')).toBeInTheDocument();
    expect(screen.getByText('Test Checkbox label')).toBeInTheDocument();
  });

  it('should toggle checkbox', () => {
    const mockOnToggleAllItems = vi.fn();

    vi.spyOn(hooks, 'useDeleteAllItemsModal').mockReturnValue({
      isModalVisible: false,
      onModalClose: vi.fn(),
      onModalOpen: vi.fn(),
      onToggleAllItems: mockOnToggleAllItems,
      onDeleteAllItems: vi.fn(),
    });

    render(<CardsHeaderActions {...mockDefaultProps} />);

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(mockOnToggleAllItems).toHaveBeenCalled();
  });

  it('should delete all selected items', () => {
    const mockOnModalOpen = vi.fn();

    vi.spyOn(hooks, 'useDeleteAllItemsModal').mockReturnValue({
      isModalVisible: false,
      onModalClose: vi.fn(),
      onModalOpen: mockOnModalOpen,
      onToggleAllItems: vi.fn(),
      onDeleteAllItems: vi.fn(),
    });

    render(<CardsHeaderActions {...mockDefaultProps} />);

    const deleteAllButton = screen.getByText('Test Button label');

    fireEvent.click(deleteAllButton);

    expect(mockOnModalOpen).toHaveBeenCalled();
  });

  it('should have Delete all button disabled if not every item is selected', () => {
    render(<CardsHeaderActions {...mockDefaultProps} isDisabled={true} />);

    const deleteAllButton = screen.getByText('Test Button label');

    expect(deleteAllButton).toHaveAttribute('disabled');
  });
});
