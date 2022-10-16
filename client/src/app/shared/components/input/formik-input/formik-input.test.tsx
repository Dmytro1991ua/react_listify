import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Formik } from 'formik';
import { expect, vi } from 'vitest';

import { CUSTOM_THEME } from './../../../../cdk/theme/theme';
import FormikInput from './formik-input';

const defaultProps = {
  name: 'Test Field',
  startIcon: <p>Test Start Icon</p>,
  endIcon: <p>Test End Icon</p>,
};

describe('<FormikInput />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Formik initialValues={{}} onSubmit={() => Promise.resolve()}>
        <FormikInput {...defaultProps} />
      </Formik>
    </ThemeProvider>
  );

  it('should render component without crashing', async () => {
    render(<Component />);

    const input = screen.getByRole('textbox', {
      name: /formik-input/,
    });

    await waitFor(() => expect(input).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Test Start Icon/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Test End Icon/)).toBeInTheDocument());
  });

  it('should correctly get value from input', async () => {
    const mockInputValue = 'Test value';

    render(<Component />);

    const input = screen.getByRole('textbox', {
      name: /formik-input/,
    });

    await act(async () => user.type(input, mockInputValue));

    expect(input.value).toBe(mockInputValue);
  });
});
