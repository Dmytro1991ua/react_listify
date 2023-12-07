import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { IoMdArrowDropdown } from 'react-icons/io';
import { vi } from 'vitest';

import GeneralSelect from './general-select';
import { CUSTOM_THEME } from '../../../../cdk/theme/theme';

const defaultProps = {
  disabled: false,
  fullWidth: true,
  icon: IoMdArrowDropdown,
  label: 'Test Label',
  name: 'Test name',
  options: [{ id: '1', value: 'Test option value', label: 'Test option label' }],
  value: '',
  onChange: vi.fn(),
};

describe('<FormikSelect>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <GeneralSelect {...defaultProps} />
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    const select = screen.getByRole('combobox', { name: /text-input/ });

    expect(select).toBeInTheDocument();
    expect(screen.getAllByText(/Test Label/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Test Label/)[1]).toBeInTheDocument();
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
});
