import * as yup from 'yup';

import { Currencies } from '../../../app.enums';
import { CreateShoppingListFromInitialValues } from '../../../modules/shopping-lists/shopping-lists.interfaces';

export const CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE = (
  shoppingListName?: string,
  currency?: Currencies
): CreateShoppingListFromInitialValues => {
  return {
    name: shoppingListName ?? '',
    currency: currency ?? Currencies.Dollar,
  };
};

export const CREATE_SHOPPING_LIST_FORM_VALIDATION: yup.SchemaOf<CreateShoppingListFromInitialValues> = yup
  .object()
  .shape({
    name: yup.string().label('Name').required(),
    currency: yup.mixed<Currencies>().oneOf(Object.values(Currencies)),
  });
