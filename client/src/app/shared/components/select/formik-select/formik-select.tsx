import { Field, FieldProps } from 'formik';
import { ReactElement } from 'react';

import { SelectProps } from '../select.interfaces';
import GeneralSelect from './../general-select/general-select';

const FormikSelect = <T,>({ name, ...props }: Partial<SelectProps<T>>): ReactElement => {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => {
        return (
          <GeneralSelect<T>
            className={props.className}
            disabled={props.disabled}
            error={meta.error}
            fullWidth={props.fullWidth}
            icon={props.icon}
            label={props.label}
            name={field.name}
            options={props.options ?? []}
            value={field.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement> & { target: { value: T | undefined } }) => {
              form.setFieldValue(field.name, e.target.value);
              if (props.onChange) {
                props.onChange(e);
              }
            }}
          />
        );
      }}
    </Field>
  );
};

export default FormikSelect;
