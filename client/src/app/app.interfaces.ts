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
  calculateByQuantity?: boolean;
  firebaseProviders?: string[];
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
  units: ProductUnits | string;
  price: number;
  isChecked?: boolean;
}

export interface ShoppingListData {
  _id?: string;
  name: string;
  currency: Currencies;
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

export interface UpdateUserInformation {
  name?: string;
  photoURL?: string;
  currency?: Currencies;
  calculateByQuantity?: boolean;
}

export interface UpdateShoppingListItemServicePayload {
  shoppingListItem: ShoppingListItem | null;
  url: string;
  successMessage?: string;
  failedMessage?: string;
}

export interface UpdateShoppingListItemActionPayload {
  shoppingListItem: ShoppingListItem | null;
  url: string;
  serviceMethod: (payload: UpdateShoppingListItemServicePayload) => Promise<ShoppingListData | null>;
  successMessage?: string;
  failedMessage?: string;
}
