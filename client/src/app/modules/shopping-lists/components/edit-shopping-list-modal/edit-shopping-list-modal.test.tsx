import { ThemeProvider } from '@mui/material';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../../mocks/test-mocks';
import EditShoppingListModal from './edit-shopping-list-modal';

const mockOnClose = vi.fn();
const mockOnSubmit = vi.fn();

const defaultProps = {
  formikInstance: COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance,
  open: true,
  title: 'Test Modal Title',
  primaryBtnLabel: 'Test Primary Button',
  secondaryBtnLabel: 'Test Secondary Button',
  fullWidth: true,
  isShoppingList: true,
  onClose: mockOnClose,
  onSubmit: mockOnSubmit,
  isDirty: true,
};

describe('<EditShoppingListModal/>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <EditShoppingListModal {...defaultProps} />
      </FormikProvider>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByText(/Test Modal Title/)).toBeInTheDocument();
    expect(screen.getByText(/Test Primary Button/)).toBeInTheDocument();
    expect(screen.getByText(/Test Secondary Button/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close-btn/ })).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: /formik-input/,
      })
    ).toBeInTheDocument();
  });

  it('should return correct value from name input', async () => {
    const mockNameValue = 'Terra';

    render(<Component />);

    const nameInput = screen.getByPlaceholderText(/Enter shopping list name/i);

    await act(async () => user.type(nameInput, mockNameValue));

    expect(nameInput.value).toBe(mockNameValue);
  });

  it('should close modal on Secondary button click', async () => {
    render(<Component />);

    const backdrop = screen.getAllByRole('presentation')[0];

    await waitFor(() => expect(backdrop).toBeInTheDocument());

    const cancelBtn = screen.getByRole('button', { name: /test secondary button/i });

    expect(cancelBtn).toBeInTheDocument();

    await act(async () => user.click(cancelBtn));

    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });

  it('should close modal on Close icon click', async () => {
    render(<Component />);

    const backdrop = screen.getAllByRole('presentation')[0];

    await waitFor(() => expect(backdrop).toBeInTheDocument());

    const closeIcon = screen.getByRole('button', { name: /close-btn/ });

    expect(closeIcon).toBeInTheDocument();

    await act(async () => user.click(closeIcon));

    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });

  it('should submit form with specified name value on Primary button click', async () => {
    const mockNameValue = 'Varus';

    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <EditShoppingListModal {...defaultProps} isDirty={false} />
        </FormikProvider>
      </ThemeProvider>
    );

    const nameInput = screen.getByPlaceholderText(/Enter shopping list name/i);
    const submitButton = screen.getByText(/Test Primary Button/);

    await act(async () => user.type(nameInput, mockNameValue));

    expect(nameInput.value).toBe(mockNameValue);

    await act(async () => user.click(submitButton));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should not submit form if name value is not specified', async () => {
    render(<Component />);

    const submitButton = screen.getByText(/Test Primary Button/);

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should show a loader when isLoading is true', () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <EditShoppingListModal {...defaultProps} isLoading={true} loader={<p>Loader</p>} />
        </FormikProvider>
      </ThemeProvider>
    );

    expect(screen.getByText('Loader')).toBeInTheDocument();
  });
});
