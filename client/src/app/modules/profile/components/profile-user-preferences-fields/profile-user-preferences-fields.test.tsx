import { ThemeProvider } from '@mui/material';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../../mocks/test-mocks';
import ProfileUserPreferencesFields from './profile-user-preferences-fields';

const defaultProps = {
  options: [{ id: '1', value: 'Test option value', label: 'Test option label' }],
};

describe('<ProfileUserPreferencesFields/>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <ProfileUserPreferencesFields
          formikInstance={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}
          options={defaultProps.options}
        />
      </FormikProvider>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByText(/Calculate prices by quantity:/)).toBeInTheDocument();
    expect(screen.getByText(/Default currency:/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /text-input/,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should switch value on switcher click', async () => {
    render(<Component />);

    const switcher = screen.getByRole('checkbox');

    await act(async () => user.click(switcher));

    expect(switcher).toBeChecked();
  });

  it('should correctly get value from select', async () => {
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
});
