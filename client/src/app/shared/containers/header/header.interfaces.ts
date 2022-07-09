export interface DropdownMenuConfig {
  id: string;
  url?: string;
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}
