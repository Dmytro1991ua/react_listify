import { InputAdornment } from '@mui/material';
import { ReactElement } from 'react';

import { TextInputProps } from './text-input.intefaces';
import { TextInputCustom } from './text-input.styled';

/**
 * Common text input component.
 * IMPORTANT: This component comes without form validation. To include validation - use component FormikInput
 * @example <TextInput fullWidth endIcon={<BsFillTrashFill />} placeholder='Email' />
 */

const TextInput = ({ startIcon, endIcon, minValue, maxValue, ...rest }: TextInputProps): ReactElement => {
  return (
    <TextInputCustom
      {...rest}
      InputProps={{
        startAdornment: <InputAdornment position='start'>{startIcon}</InputAdornment>,
        endAdornment: <InputAdornment position='end'>{endIcon}</InputAdornment>,
        inputProps: {
          min: minValue,
          max: maxValue,
        },
      }}
    />
  );
};

export default TextInput;
