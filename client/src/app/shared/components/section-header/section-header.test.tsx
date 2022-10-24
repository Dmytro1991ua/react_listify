import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { vi } from 'vitest';

import SectionHeader from './section-header';

const mockHistoryGoBack = vi.fn();
const mockOnPrimaryButtonClick = vi.fn();
const mockOnSecondaryButtonClick = vi.fn();

vi.doMock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useHistory: () => ({
    goBack: mockHistoryGoBack,
  }),
}));

const defaultProps = {
  title: 'Test Header',
  primaryBtnLabel: 'Test Primary Button',
  secondaryBtnLabel: 'Test Secondary Button',
  isShoppingListDetails: false,
  onPrimaryButtonClick: mockOnPrimaryButtonClick,
  onSecondaryButtonClick: mockOnSecondaryButtonClick,
  onGoBack: mockHistoryGoBack,
};

describe('<SectionHeader>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component with props without crashing', () => {
    render(<SectionHeader {...defaultProps} />);

    expect(screen.getByText(/Test Header/)).toBeInTheDocument();
    expect(screen.getByText(/Test Primary Button/)).toBeInTheDocument();
  });

  it('should render Go back button and Secondary button for shopping list details page', () => {
    const isShoppingListDetails = true;

    render(<SectionHeader {...defaultProps} isShoppingListDetails={isShoppingListDetails} />);

    const goBackBtn = screen.getByRole('button', { name: /go-back/ });

    expect(screen.getByText(/Test Header/)).toBeInTheDocument();
    expect(screen.getByText(/Test Primary Button/)).toBeInTheDocument();
    expect(screen.getByText(/Test Secondary Button/)).toBeInTheDocument();
    expect(goBackBtn).toBeInTheDocument();
  });

  it('should redirect to previous page on goBack button click', async () => {
    const isShoppingListDetails = true;

    render(<SectionHeader {...defaultProps} isShoppingListDetails={isShoppingListDetails} />);

    const goBackBtn = screen.getByRole('button', { name: /go-back/ });

    expect(goBackBtn).toBeInTheDocument();

    await act(async () => user.click(goBackBtn));

    await waitFor(() => expect(mockHistoryGoBack).toHaveBeenCalledTimes(1));
  });

  it('should open modal window on Primary button click within shopping lists page', async () => {
    render(<SectionHeader {...defaultProps} />);

    const primaryBtn = screen.getByText(/Test Primary Button/);

    expect(primaryBtn).toBeInTheDocument();

    await act(async () => user.click(primaryBtn));

    await waitFor(() => expect(mockOnPrimaryButtonClick).toHaveBeenCalledTimes(1));
  });

  it('should open modal window on Secondary button click within shopping lists details page', async () => {
    const isShoppingListDetails = true;

    render(<SectionHeader {...defaultProps} isShoppingListDetails={isShoppingListDetails} />);

    const secondaryBtn = screen.getByText(/Test Secondary Button/);

    expect(secondaryBtn).toBeInTheDocument();

    await act(async () => user.click(secondaryBtn));

    await waitFor(() => expect(mockOnSecondaryButtonClick).toHaveBeenCalledTimes(1));
  });
});
