import { useState } from 'react';

type ReturnedHookType = {
  anchorElement: HTMLElement | null;
  isDropdownMenuOpened: boolean;
  onDropdownMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDropdownMenuClose: () => void;
};

export const useDropdownMenu = (): ReturnedHookType => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const isDropdownMenuOpened = Boolean(anchorElement);

  function onDropdownMenuOpen(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    setAnchorElement(event.currentTarget);
  }

  function onDropdownMenuClose(): void {
    setAnchorElement(null);
  }

  return { anchorElement, isDropdownMenuOpened, onDropdownMenuClose, onDropdownMenuOpen };
};
