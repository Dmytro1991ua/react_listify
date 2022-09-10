import { TextFieldProps } from '@mui/material';

export type TextInputProps = {
  /**
   * @param {React.ReactNode} startIcon - represents a left side position of an icon inside a button
   * @default undefined
   * @example startIcon={<FaTrash />}
   */
  startIcon?: React.ReactNode;
  /**
   * @param {React.ReactNode} startIcon - represents a right side position of an icon inside a button
   * @default undefined
   * @example endIcon={<FaTrash />}
   */
  endIcon?: React.ReactNode;
  /**
   * @param {number} MinValue - defines a possible min value for input with type number
   * @default undefined
   * @example 0/10/15
   */
  minValue?: number;
  /**
   * @param {number} MinValue - defines a possible max value for input with type number
   * @default undefined
   * @example 100/1000
   */
  maxValue?: number;
} & TextFieldProps;
