export interface DropdownOption<T> {
  value: T;
  label: string;
  id: string;
}

export interface SelectProps<T> {
  /**
   * @param {T} Defines a value of controlled text field
   * @example 'Label'
   */
  value: T;
  /**
   * @param {DropdownOption<T>[]} Defines possible array of options for select dropdown
   * @default []
   * @example [{value: '1', label: 'Label'}]
   */
  options: DropdownOption<T>[];
  onChange: (e: React.ChangeEvent<HTMLInputElement> & { target: { value: T | undefined } }) => void;
  /**
   * @param {string} className -default property which required by styled-components
   * https://styled-components.com/docs/basics#styling-any-component
   * @default undefined
   */
  className?: string;
  /**
   * Formik TextField name
   * @param string
   * @default undefined.
   * @example fullName, age
   */
  name?: string;
  /**
   * Formik TextField Errors
   * @param boolean
   * @default undefined
   */
  error?: string;
  /**
   * @param {string} Defines a label for a select field
   * @default undefined
   * @example Select Age
   */
  label?: string;
  /**
   * @param {React.ElementType} Defines
   * @default undefined
   */
  icon?: React.ElementType;
  disabled?: boolean;
  fullWidth?: boolean;
}
