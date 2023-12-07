import { ThemeProvider } from '@mui/material';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import CreateShoppingListModal from './create-shopping-list-modal';
import { CUSTOM_THEME } from '../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../mocks/test-mocks';

const mockOnClose = vi.fn();
const mockOnSubmit = vi.fn();
const mockOptionValue = [{ id: '1', value: 'Test option value', label: 'Test option label' }];

const defaultProps = {
  formikInstance: COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance,
  open: true,
  title: 'Test Modal Title',
  primaryBtnLabel: 'Test Primary Button',
  secondaryBtnLabel: 'Test Secondary Button',
  fullWidth: true,
  options: mockOptionValue,
  isShoppingList: true,
  onClose: mockOnClose,
  onSubmit: mockOnSubmit,
  isDirty: true,
};

describe('<CreateShoppingListModal/>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <CreateShoppingListModal {...defaultProps} />
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

    expect(screen.getByPlaceholderText(/enter the name of the list/i)).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', {
        name: /text-input/,
      })
    ).toBeInTheDocument();
  });

  it('should return correct value from name input', async () => {
    const mockNameValue = 'Terra';

    render(<Component />);

    const nameInput = screen.getByPlaceholderText(/enter the name of the list/i);

    await act(async () => user.type(nameInput, mockNameValue));

    expect(nameInput.value).toBe(mockNameValue);
  });

  it('should get value from select and close backdrop', async () => {
    render(<Component />);

    const select = screen.getByRole('combobox', {
      name: /text-input/,
    });

    expect(select).toBeInTheDocument();

    await act(async () => user.click(select));
    const backdrop = screen.getByRole('presentation');

    await waitFor(() => expect(screen.getByText(/Test option label/)).toBeInTheDocument());
    await waitFor(() => expect(backdrop).toBeInTheDocument());

    const option = screen.getByRole('option');

    await act(async () => user.click(option));

    await waitFor(() => expect(backdrop).not.toBeInTheDocument());
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
          <CreateShoppingListModal {...defaultProps} isDirty={false} />
        </FormikProvider>
      </ThemeProvider>
    );

    const nameInput = screen.getByPlaceholderText(/enter the name of the list/i);
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

  it('should not display select if user create a copy of shopping list', async () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <CreateShoppingListModal {...defaultProps} isShoppingList={false} />
        </FormikProvider>
      </ThemeProvider>
    );

    expect(
      screen.queryByRole('button', {
        name: /text-input/,
      })
    ).not.toBeInTheDocument();
  });

  it('should show a loader when isLoading is true', () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <CreateShoppingListModal {...defaultProps} isLoading={true} loader={<p>Loader</p>} />
        </FormikProvider>
      </ThemeProvider>
    );

    expect(screen.getByText('Loader')).toBeInTheDocument();
  });
});
