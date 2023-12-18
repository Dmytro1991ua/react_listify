import { act, renderHook } from '@testing-library/react-hooks';
import { vi } from 'vitest';

import { useCardHeaderActions } from './useCardHeaderActions';

describe('useCardHeaderActions', () => {
  const defaultProps = {
    onClick: vi.fn(),
    onToggle: vi.fn(),
  };

  const hook = () => renderHook(() => useCardHeaderActions(defaultProps));

  it('should return isVisible as false byt default', () => {
    const { result } = hook();

    expect(result.current.isModalVisible).toBe(false);
  });

  it('should trigger onModalOpen handler', () => {
    const { result } = hook();

    act(() => result.current.onModalOpen());

    expect(result.current.isModalVisible).toBe(true);
  });

  it('should trigger onToggleAllItems handler', () => {
    const mockEvent = { target: { checked: true } } as React.ChangeEvent<HTMLInputElement>;

    const { result } = hook();

    act(() => result.current.onToggleAllItems(mockEvent));

    expect(defaultProps.onToggle).toHaveBeenCalled();
  });

  it('should trigger onDeleteAllItems handler', () => {
    const { result } = hook();

    act(() => result.current.onDeleteAllItems());

    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
