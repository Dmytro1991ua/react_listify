import { ThemeProvider } from '@mui/material';
import { act, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../../mocks/test-mocks';
import DeleteShoppingListModal from './delete-shopping-list-modal';

const mockOnModalClose = vi.fn();
const mockOnDelete = vi.fn();

const defaultProps = {
  isModalOpen: true,
  onModalClose: mockOnModalClose,
  onSubmit: mockOnDelete,
};

describe('<DeleteShoppingListModal />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <DeleteShoppingListModal {...defaultProps} onDelete={mockOnDelete} onModalClose={mockOnModalClose} />
      </FormikProvider>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <DeleteShoppingListModal {...defaultProps} />
        </FormikProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Are you sure you want to delete shopping list with details?/));
    expect(screen.getByText(/Yes/i)).toBeInTheDocument();
    expect(screen.getByText(/No/i)).toBeInTheDocument();
    expect(screen.getAllByRole('presentation')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('presentation')[1]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close-btn/ })).toBeInTheDocument();
  });

  it('should close modal on No button click', async () => {
    render(<Component />);

    const closeBtn = screen.getByText(/No/i);

    await act(async () => user.click(closeBtn));

    expect(mockOnModalClose).toHaveBeenCalled();
  });

  it('should close modal on Close icon click', async () => {
    render(<Component />);

    const closeIcon = screen.getByRole('button', { name: /close-btn/ });

    await act(async () => user.click(closeIcon));

    expect(mockOnModalClose).toHaveBeenCalled();
  });

  it('should delete shopping list Ok button click', async () => {
    render(<Component />);

    const submitButton = screen.getByText(/Yes/i);

    await act(async () => user.click(submitButton));

    expect(mockOnDelete).toHaveBeenCalled();
  });
});
