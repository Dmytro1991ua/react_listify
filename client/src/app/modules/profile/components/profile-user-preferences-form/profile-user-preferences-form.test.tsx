import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../../mocks/test-mocks';
import ProfileUserPreferencesForm from './profile-user-preferences-form';

const defaultProps = {
  options: [{ id: '1', value: 'Test option value', label: 'Test option label' }],
};

describe('<ProfileUserPreferencesForm />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <ProfileUserPreferencesForm
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
});
