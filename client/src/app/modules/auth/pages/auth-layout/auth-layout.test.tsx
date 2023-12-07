import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import AuthLayout from './auth-layout';
import SignInPreviewImage from '../../../../../assets/images/auth/sign-in-img.jpg';

const defaultProps = {
  children: <p>Children Content</p>,
  image: SignInPreviewImage,
  overlayText: 'Test Overlay text',
  textPosition: '50',
};

describe('<AuthLayout/>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render component with props without crashing', () => {
    render(<AuthLayout {...defaultProps} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(/Test Overlay text/)).toBeInTheDocument();
    expect(screen.getByText(/Listify/)).toBeInTheDocument();
    expect(screen.getByText(/Children Content/)).toBeInTheDocument();
    expect(screen.getByText(/Your perfect choice for shopping and creating the best grocery list/)).toBeInTheDocument();
  });
});
