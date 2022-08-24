import React, { ReactElement } from 'react';

import { CustomButton } from './button.styled';

interface ButtonProps {
  /**
   * @param {string} variant - represent a specific variant for a particular button (specific styles applied)
   * @default specific variant: 'primary', 'secondary'
   * @example 'primary', 'secondary'
   */
  variant:
    | 'primaryContained'
    | 'secondaryContained'
    | 'primaryOutlined'
    | 'secondaryOutlined'
    | 'transparent'
    | 'raised';
  /**
   * @param {string} type -button type
   * @default undefined
   */
  type?: 'button' | 'reset' | 'submit';
  children?: React.ReactNode;
  /**
   * @param {boolean} disabled - represent a disabled state of a button
   * @default undefined
   * @example 'true', 'false'
   */
  disabled?: boolean;
  /**
   * @param {React.ReactNode} startIcon - represent a left side position of an icon inside a button
   * @default undefined
   * @example startIcon={<FaTrash />}
   */
  startIcon?: React.ReactNode;
  /**
   * @param {React.ReactNode} startIcon - represent a right side position of an icon inside a button
   * @default undefined
   * @example startIcon={<FaTrash />}
   */
  endIcon?: React.ReactNode;
  /**
   * @param {boolean} fullWidth - represent a possible full width of the button itself
   * @default undefined
   * @example 'true', 'false'
   */
  fullWidth?: boolean;
  /**
   * @param {string} className -default property which required by styled-components
   * https://styled-components.com/docs/basics#styling-any-component
   * @default undefined
   */
  className?: string;
  onClick: () => void;
}

const Button = ({
  variant,
  children,
  disabled,
  fullWidth,
  className,
  startIcon,
  endIcon,
  type,
  onClick,
}: ButtonProps): ReactElement => {
  function handleButtonClick(e: React.MouseEvent<Element, MouseEvent>): void {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  }

  return (
    <CustomButton
      className={className}
      disabled={disabled}
      endIcon={endIcon}
      fullWidth={fullWidth}
      startIcon={startIcon}
      type={type}
      variant={variant}
      onClick={handleButtonClick}
    >
      {children}
    </CustomButton>
  );
};

export default Button;
