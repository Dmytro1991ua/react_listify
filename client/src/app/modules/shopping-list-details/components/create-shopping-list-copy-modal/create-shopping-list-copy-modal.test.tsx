import { ThemeProvider } from '@mui/material';
import { act, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import CreateShoppingListCopyModal from './create-shopping-list-copy-modal';
import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../../mocks/test-mocks';

const mockOnModalClose = vi.fn();

const defaultProps = {
  formikInstance: COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance,
  isModalOpen: true,
  title: 'Test copy Shopping List title',
  onModalClose: mockOnModalClose,
};

describe('<CreateShoppingListCopyModal />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <CreateShoppingListCopyModal {...defaultProps} onModalClose={mockOnModalClose} />
      </FormikProvider>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <CreateShoppingListCopyModal {...defaultProps} />
        </FormikProvider>
      </ThemeProvider>
    );

    expect(screen.getByPlaceholderText(/enter the name of the list/i)).toBeInTheDocument();
    expect(screen.getByText(/Test copy Shopping List title/)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    expect(screen.getByText(/Close/i)).toBeInTheDocument();
    expect(screen.getAllByRole('presentation')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('presentation')[1]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close-btn/ })).toBeInTheDocument();
  });

  it('should close modal on Close button click', async () => {
    render(<Component />);

    const closeBtn = screen.getByText(/Close/i);

    await act(async () => user.click(closeBtn));

    expect(mockOnModalClose).toHaveBeenCalled();
  });

  it('should close modal on Close icon click', async () => {
    render(<Component />);

    const closeIcon = screen.getByRole('button', { name: /close-btn/ });

    await act(async () => user.click(closeIcon));

    expect(mockOnModalClose).toHaveBeenCalled();
  });

  it('should show a loader when isLoading is true', () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <CreateShoppingListCopyModal {...defaultProps} isLoading={true} loader={<p>Loader</p>} />
        </FormikProvider>
      </ThemeProvider>
    );

    expect(screen.getByText('Loader')).toBeInTheDocument();
  });
});
