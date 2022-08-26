import * as yup from 'yup';

import { CreateShoppingListFromInitialValues } from './../../shopping-lists.interfaces';

export const CREATE_SHOPPING_LIST_FORM_INITIAL_VALUE = (
  shoppingListName?: string
): CreateShoppingListFromInitialValues => {
  return {
    name: shoppingListName ?? '',
  };
};

export const CREATE_SHOPPING_LIST_FORM_VALIDATION: yup.SchemaOf<CreateShoppingListFromInitialValues> = yup
  .object()
  .shape({
    name: yup.string().label('Name').required(),
  });
