import { ReactElement } from 'react';

import { CustomSwitcher } from './switch.styled';

interface SwitcherProps {
  /**
   * @param {boolean} Defines the state of a switcher
   * @default false
   * @example checked={true}
   */
  checked: boolean;
  /**
   * onChange callback fired when the state of the switcher is changed.
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * @param {boolean} Defines if the switcher is disabled or not
   * @default false
   * @example disabled={true}
   */
  disabled?: boolean;
  /**
   * @param {string} Defines the field name
   * @default undefined
   * @example switch
   */
  name?: string;
  /**
   * @param {string} Defines the size of the switcher itself
   * @default medium
   * @example 'small' | 'medium'
   */
  size?: 'small' | 'medium' | undefined;
}

const Switch = ({ checked, name, disabled, size, onChange }: SwitcherProps): ReactElement => {
  return (
    <CustomSwitcher disableRipple checked={checked} disabled={disabled} name={name} size={size} onChange={onChange} />
  );
};

export default Switch;
