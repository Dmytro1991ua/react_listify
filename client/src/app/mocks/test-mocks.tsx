import { vi } from 'vitest';

import { Currencies, ProductUnits } from '../app.enums';

export const COMMON_DEFAULT_FORMIK_INSTANCE = {
  formikInstance: {
    dirty: false,
    values: vi.fn(),
    touched: vi.fn(),
    isSubmitting: false,
    isValidating: false,
    submitCount: 0,
    errors: vi.fn(),
    isValid: true,
    initialValues: vi.fn(),
    initialErrors: vi.fn(),
    initialTouched: vi.fn(),
    getFieldHelpers: vi.fn(),
    getFieldMeta: vi.fn(),
    getFieldProps: () => vi.fn(),
    handleBlur: vi.fn(),
    handleChange: vi.fn(),
    handleReset: vi.fn(),
    handleSubmit: vi.fn(),
    setStatus: vi.fn(),
    setErrors: vi.fn(),
    setSubmitting: vi.fn(),
    setTouched: vi.fn(),
    setValues: vi.fn(),
    setFieldValue: vi.fn(),
    setFieldError: vi.fn(),
    setFieldTouched: vi.fn(),
    validateForm: vi.fn(),
    validateField: vi.fn(),
    resetForm: vi.fn(),
    submitForm: vi.fn(),
    setFormikState: vi.fn(),
    registerField: vi.fn(),
    unregisterField: vi.fn(),
  },
};

export const defaultShoppingListItems = [
  { _id: '1', name: 'Apple', quantity: 2, units: ProductUnits.Kilogram, price: 4, isChecked: true },
  { _id: '2', name: 'Orange', quantity: 3, units: ProductUnits.Kilogram, price: 12, isChecked: false },
  { _id: '3', name: 'Milk', quantity: 1.5, units: ProductUnits.Liter, price: 5, isChecked: true },
  { _id: '4', name: 'Yogurt', quantity: 1, units: ProductUnits.Liter, price: 2, isChecked: false },
  { _id: '5', name: 'Nuts', quantity: 1, units: ProductUnits.Liter, price: 2, isChecked: false },
];

export const defaultCheckedShoppingListItems = [
  { _id: '1', name: 'Apple', quantity: 2, units: ProductUnits.Kilogram, price: 4, isChecked: true },
  { _id: '3', name: 'Milk', quantity: 1.5, units: ProductUnits.Liter, price: 5, isChecked: true },
];

export const expectedShoppingListsSortingResult = [
  { _id: '5', name: 'Nuts', quantity: 1, units: ProductUnits.Liter, price: 2, isChecked: false },
  { _id: '2', name: 'Orange', quantity: 3, units: ProductUnits.Kilogram, price: 12, isChecked: false },
  { _id: '4', name: 'Yogurt', quantity: 1, units: ProductUnits.Liter, price: 2, isChecked: false },
  ...defaultCheckedShoppingListItems,
];

export const defaultShoppingLists = [
  {
    _id: '1',
    name: 'Terra',
    currency: Currencies.Dollar,
    shoppingListItems: defaultShoppingListItems,
    isFavorite: false,
  },
  {
    _id: '2',
    name: 'Varus',
    currency: Currencies.Euro,
    shoppingListItems: defaultShoppingListItems,
    isFavorite: true,
  },
  { _id: '3', name: 'Carrefour', currency: Currencies.Pound, shoppingListItems: [], isFavorite: false },
];

export const defaultSortedShoppingLists = [
  {
    _id: '2',
    name: 'Varus',
    currency: Currencies.Euro,
    shoppingListItems: defaultShoppingListItems,
    isFavorite: true,
  },
  {
    _id: '3',
    name: 'Carrefour',
    currency: Currencies.Pound,
    shoppingListItems: [],
    isFavorite: false,
  },
  {
    _id: '1',
    name: 'Terra',
    currency: Currencies.Dollar,
    shoppingListItems: defaultShoppingListItems,
    isFavorite: false,
  },
];
export const defaultSortedDropdownItems = [
  { id: '1', value: 'Apple', label: 'Apple' },
  { id: '2', value: 'Salmon', label: 'Salmon' },
  { id: '3', value: 'Banana', label: 'Banana' },
  { id: '4', value: 'Milk', label: 'Milk' },
];

export const expectedDropdownItemsSortingResult = [
  { id: '1', value: 'Apple', label: 'Apple' },
  { id: '3', value: 'Banana', label: 'Banana' },
  { id: '4', value: 'Milk', label: 'Milk' },
  { id: '2', value: 'Salmon', label: 'Salmon' },
];
