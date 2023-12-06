import { useCallback, useState } from 'react';

type HookProps = {
  onClick?: () => void;
  onToggle?: (value: boolean) => void;
};

type ReturnedHookType = {
  isModalVisible: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
  onToggleAllItems: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteAllItems: () => void;
};

export const useDeleteAllItemsModal = ({ onClick, onToggle }: HookProps): ReturnedHookType => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onModalOpen = useCallback(() => setIsModalVisible(true), []);
  const onModalClose = useCallback(() => setIsModalVisible(false), []);

  const onToggleAllItems = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onToggle && onToggle(e.target.checked);
    },
    [onToggle]
  );

  const onDeleteAllItems = useCallback(async () => {
    onClick && onClick();
    onModalClose();
  }, [onClick, onModalClose]);

  return {
    isModalVisible,
    onModalOpen,
    onModalClose,
    onToggleAllItems,
    onDeleteAllItems,
  };
};
