import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import FallbackMessage from './fallback-message';

const defaultProps = {
  title: 'Test Title',
  subtitle: 'Test Subtitle',
};

describe('<FallbackMessage />', () => {
  it('should render component with props without crashing', () => {
    render(<FallbackMessage {...defaultProps} />);

    expect(screen.getByText(/Test Title/)).toBeInTheDocument();
    expect(screen.getByText(/Test Subtitle/)).toBeInTheDocument();
  });
});
