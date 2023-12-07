import { ThemeProvider } from '@mui/material';
import { act, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FormikProvider } from 'formik';
import { vi } from 'vitest';

import ProfileUserInformationImage from './profile-user-information-image';
import { CUSTOM_THEME } from '../../../../cdk/theme/theme';
import { COMMON_DEFAULT_FORMIK_INSTANCE } from '../../../../mocks/test-mocks';

const mockOnChange = vi.fn();

const defaultProps = {
  uploadProgress: 0,
  onChange: mockOnChange,
};

describe('<ProfileUserInformationImage />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
        <ProfileUserInformationImage {...defaultProps} formikInstance={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance} />
      </FormikProvider>
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByRole('img', { name: /user's profile photo/i })).toBeInTheDocument();
    expect(document.querySelector('#file')).toBeInTheDocument();
    expect(screen.getByTestId('AddAPhotoIcon')).toBeInTheDocument();
  });

  it('should upload image', async () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

    render(<Component />);

    const input = document.querySelector('#file') as unknown as HTMLInputElement;

    await act(async () => user.upload(input, mockFile));

    expect(input.files[0]).toBe(mockFile);
  });

  it('should show a progress bar on image uploading', async () => {
    render(
      <ThemeProvider theme={CUSTOM_THEME}>
        <FormikProvider value={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}>
          <ProfileUserInformationImage
            {...defaultProps}
            formikInstance={COMMON_DEFAULT_FORMIK_INSTANCE.formikInstance}
            uploadProgress={80}
          />
        </FormikProvider>
      </ThemeProvider>
    );

    expect(screen.getByRole('heading', { name: /80%/i }));
    expect(screen.getByRole('progressbar'));
  });
});
