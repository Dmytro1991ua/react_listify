import { FormikProps } from 'formik';

import { Currencies, ProductUnits } from './app.enums';
import { DropdownOption } from './shared/components/select/select.interfaces';

export interface CurrentUser {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber?: string | null;
  emailVerified?: boolean;
  currency?: Currencies;
}

export interface Category {
  id: string | null;
  iconName: string;
  isCustom: boolean;
  label: string;
  value: string;
}
export interface ShoppingListItem {
  _id?: string;
  name: string;
  category?: Category;
  quantity: number;
  units: ProductUnits;
  price: number;
  isChecked?: boolean;
}

export interface ShoppingListData {
  _id?: string;
  name: string;
  currency: string;
  shoppingListItems: ShoppingListItem[];
}

export type LoadingStatus = 'loading' | 'idle' | 'failed';

export type SortingItem = Partial<ShoppingListData & ShoppingListItem>;

export interface CommonModalProps<T> {
  formikInstance: FormikProps<T>;
  open: boolean;
  title?: string;
  primaryBtnLabel?: string;
  secondaryBtnLabel?: string;
  fullWidth?: boolean;
  isDirty?: boolean;
  isShoppingList?: boolean;
  options?: DropdownOption<string>[];
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
}
