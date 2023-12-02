import { MenuItem } from '@mui/material';
import { ReactElement } from 'react';

import { CustomSelect } from './general-select.styled';
import { SelectProps } from '../select.interfaces';

const GeneralSelect = <T,>({
  value,
  options,
  className,
  label,
  fullWidth,
  icon,
  disabled,
  error,
  onChange,
}: SelectProps<T>): ReactElement => {
  const labelVisibility = !value ? label : null;

  return (
    <CustomSelect
      select
      InputLabelProps={{ shrink: false }}
      SelectProps={{
        IconComponent: icon,
      }}
      className={className}
      disabled={disabled}
      error={Boolean(error)}
      fullWidth={fullWidth}
      helperText={error}
      label={labelVisibility}
      value={value ?? ''}
      onChange={onChange}
    >
      {options &&
        options.map((option) => (
          <MenuItem key={option.id} value={`${option.value}`}>
            {option.label}
          </MenuItem>
        ))}
    </CustomSelect>
  );
};

export default GeneralSelect;
