import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Formik } from 'formik';
import { IoMdArrowDropdown } from 'react-icons/io';
import { vi } from 'vitest';

import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import FormikSelect from './formik-select';

const defaultProps = {
  disabled: false,
  fullWidth: true,
  icon: IoMdArrowDropdown,
  label: 'Test Label',
  name: 'Test name',
  options: [{ id: '1', value: 'Test option value', label: 'Test option label' }],
  value: 'Test Value',
  onChange: vi.fn(),
};

describe('<FormikSelect>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Formik initialValues={{}} onSubmit={() => Promise.resolve()}>
        <FormikSelect {...defaultProps} />
      </Formik>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    const select = screen.getByRole('button', { name: /text-input/ });

    expect(screen.getAllByText(/Test Label/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Test Label/)[1]).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });

  it('should correctly get value from select', async () => {
    render(<Component />);

    const select = screen.getByRole('button', {
      name: /text-input/,
    });

    expect(select).toBeInTheDocument();

    act(() => user.click(select));

    await waitFor(() => expect(screen.getByText(/Test option label/)).toBeInTheDocument());

    const option = screen.getByRole('option');

    act(() => user.click(option));

    const backdrop = screen.getByRole('presentation');

    await waitFor(() => expect(backdrop).not.toBeInTheDocument());
  });
});
