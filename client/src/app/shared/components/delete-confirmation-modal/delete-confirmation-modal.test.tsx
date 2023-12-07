import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import DeleteConfirmationModal from './delete-confirmation-modal';
import { CUSTOM_THEME } from '../../../cdk/theme/theme';

const mockOnClose = vi.fn();
const mockOnSubmit = vi.fn();

const defaultProps = {
  open: true,
  title: 'Test Modal Title',
  primaryBtnLabel: 'Test Primary Button',
  secondaryBtnLabel: 'Test Secondary Button',
  fullWidth: true,
  onClose: mockOnClose,
  onSubmit: mockOnSubmit,
};

describe('<DeleteConfirmationModal/>', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const Component = (): JSX.Element => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <DeleteConfirmationModal {...defaultProps} />
    </ThemeProvider>
  );

  it('should render component with props without crashing', () => {
    render(<Component />);

    expect(screen.getByText(/Test Modal Title/)).toBeInTheDocument();
    expect(screen.getByText(/Test Primary Button/)).toBeInTheDocument();
    expect(screen.getByText(/Test Secondary Button/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close-btn/ })).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
