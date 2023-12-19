import * as yup from 'yup';

import { EditProductItemFormInitialValues } from './edit-product-item.modal.interfaces';
import { ProductUnits } from '../../../../app.enums';
import { ShoppingListItem } from '../../../../app.interfaces';

export const EDIT_SHOPPING_LIST_ITEM_FORM_INITIAL_VALUE = (
  shoppingListItem?: ShoppingListItem | null
): EditProductItemFormInitialValues => {
  return {
    name: shoppingListItem?.name ?? 'New Product',
    quantity: shoppingListItem?.quantity,
    unit: shoppingListItem?.units ?? ProductUnits.Default,
    price: shoppingListItem?.price,
  };
};

export const EDIT_SHOPPING_LIST_FORM_VALIDATION: yup.SchemaOf<EditProductItemFormInitialValues> = yup.object().shape({
  name: yup.string().label('Name').required(),
  quantity: yup
    .number()
    .label('Quantity')
    .moreThan(0, 'Product quantity should not be less than zero')
    .lessThan(1000, 'Product quantity should not be more than 1000'),
  unit: yup.mixed<ProductUnits>().oneOf(Object.values(ProductUnits)),
  price: yup
    .number()
    .label('Price')
    .moreThan(0, 'Product price should not less than zero')
    .lessThan(1000, 'Product price should not less than 1000'),
});
