import { TextFieldProps } from '@mui/material';
import React, { ReactElement } from 'react';

import { TextInputCustom } from './text-input.styled';

export type TextInputProps = {
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
} & TextFieldProps;

/**
 * Common text input component.
 * IMPORTANT: This component comes without form validation. To include validation - use component FormikInput
 * @example <TextInput fullWidth endIcon={<BsFillTrashFill />} placeholder='Email' />
 */

const TextInput = ({ startIcon, endIcon, ...rest }: TextInputProps): ReactElement => {
  return (
    <TextInputCustom
      {...rest}
      InputProps={{
        startAdornment: startIcon,
        endAdornment: endIcon,
      }}
    />
  );
};

export default TextInput;
