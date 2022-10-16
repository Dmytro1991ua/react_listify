import { Field } from 'formik';
import { ReactElement } from 'react';

import { TextInputProps } from '../text-input/text-input.interface';
import { FormTextInputCustom } from './formik-input.styled';

/**
 * Common form text input component.
 * IMPORTANT: This component should be wrapped inside Formik.
 * @example
 * <Formik initialValues={{ test: '' }} validationSchema={validation} onSubmit={() => {}>
 *  {() => (
 *    <Form>
 *      <FormikInput id='name' name='name' placeholder='Enter your name'       startIcon={<BsFillTrashFill />} />
 *    </Form>
 *  )}
 * </Formik>
 */

const FormikInput = ({ name, startIcon, endIcon, ...props }: TextInputProps): ReactElement => {
  return (
    <Field
      {...props}
      InputProps={{
        startAdornment: startIcon,
        endAdornment: endIcon,
      }}
      component={FormTextInputCustom}
      id={name}
      inputProps={{ 'aria-label': 'formik-input' }}
      name={name}
    />
  );
};

export default FormikInput;
