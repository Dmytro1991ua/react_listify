import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import AuthImagePreview from './auth-image-preview';
import SignInPreviewImage from '../../../../../assets/images/auth/sign-in-img.jpg';

const defaultProps = {
  image: SignInPreviewImage,
  overlayText: 'Test Overlay text',
  textPosition: '50',
};

describe('<AuthForgotPasswordForm />', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => <AuthImagePreview {...defaultProps} />;

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/Test Overlay text/)).toBeInTheDocument();
  });
});
