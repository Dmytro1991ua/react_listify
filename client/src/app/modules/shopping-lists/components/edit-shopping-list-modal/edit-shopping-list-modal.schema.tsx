import * as yup from 'yup';

import { EditShoppingListFormInitialValues } from './edit-shopping-list.modal.interfaces';

export const EDIT_SHOPPING_LIST_FORM_INITIAL_VALUE = (shoppingListName?: string): EditShoppingListFormInitialValues => {
  return {
    name: shoppingListName ?? 'New Shopping List',
  };
};

export const EDIT_SHOPPING_LIST_FORM_VALIDATION: yup.SchemaOf<EditShoppingListFormInitialValues> = yup.object().shape({
  name: yup.string().label('Name').required(),
});
