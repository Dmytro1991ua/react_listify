import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../../mocks/test-mocks';
import EditProductItemModal from './edit-product-item-modal';

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

describe('<EditProductItemModal/>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <EditProductItemModal {...defaultProps} />
      </FormikProvider>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByText(/Test Modal Title/)).toBeInTheDocument();
    expect(screen.getByText(/Test Primary Button/)).toBeInTheDocument();
    expect(screen.getByText(/Test Secondary Button/)).toBeInTheDocument();
    expect(screen.getAllByText(/Choose product unit/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Choose product unit/)[1]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close-btn/ })).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/enter product name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter product quantity/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter product price/i)).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: /formik-input/,
      })
    ).toBeInTheDocument();
  });

  it('should render select without options', async () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <EditProductItemModal {...defaultProps} options={[]} />
        </FormikProvider>
      </ThemeProvider>
    );

    const select = screen.getByRole('button', {
      name: /text-input/,
    });

    expect(select).toBeInTheDocument();

    await act(async () => user.click(select));

    await waitFor(() => expect(screen.queryByText(/Test option label/)).not.toBeInTheDocument());
  });

  it('should return correct value from name input', async () => {
    const mockNameValue = 'Milk';

    render(<Component />);

    const nameInput = screen.getByPlaceholderText(/enter product name/i);

    await act(async () => user.type(nameInput, mockNameValue));

    expect(nameInput.value).toBe(mockNameValue);
  });

  it('should return correct value from quantity input', async () => {
    const mockQuantityValue = '2';

    render(<Component />);

    const quantityInput = screen.getByPlaceholderText(/enter product quantity/i);

    await act(async () => user.type(quantityInput, mockQuantityValue));

    expect(quantityInput.value).toBe(mockQuantityValue);
  });

  it('should return correct value from price input', async () => {
    const mockPriceValue = '12';

    render(<Component />);

    const priceInput = screen.getByPlaceholderText(/enter product price/i);

    await act(async () => user.type(priceInput, mockPriceValue));

    expect(priceInput.value).toBe(mockPriceValue);
  });

  it('should get value from select and close backdrop', async () => {
    render(<Component />);

    const select = screen.getByRole('button', {
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
          <EditProductItemModal {...defaultProps} isDirty={false} />
        </FormikProvider>
      </ThemeProvider>
    );

    const nameInput = screen.getByPlaceholderText(/enter product name/i);
    const submitButton = screen.getByText(/Test Primary Button/);

    await act(async () => user.type(nameInput, mockNameValue));

    expect(nameInput.value).toBe(mockNameValue);

    await act(async () => user.click(submitButton));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should not submit form if name value is not specified', async () => {
    render(<Component />);

    const submitButton = screen.getByText(/Test Primary Button/);

    await act(async () => user.click(submitButton));

    expect(submitButton).toBeDisabled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
