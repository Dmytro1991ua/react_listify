import { CheckboxProps } from '@mui/material/Checkbox/Checkbox';
import { ReactElement } from 'react';

import { CustomCheckbox } from './checkbox.styled';

interface CustomCheckboxProps extends CheckboxProps {
  /**
   * @param {string} className -default property which required by styled-components
   * https://styled-components.com/docs/basics#styling-any-component
   * @default undefined
   */
  className?: string;
  /**
   * @param {string} customSize - defines the custom width and height of the checkbox itself
   * @default undefined
   * @example '3rem'
   */
  customSize?: string;
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate?: boolean;
}

const Checkbox = ({
  checked,
  disabled,
  onChange,
  size,
  customSize,
  indeterminate,
  className,
}: CustomCheckboxProps): ReactElement => {
  return (
    <CustomCheckbox
      disableRipple
      checked={checked}
      className={className}
      customSize={customSize}
      disabled={disabled}
      indeterminate={indeterminate}
      size={size}
      onChange={onChange}
    />
  );
};

export default Checkbox;
