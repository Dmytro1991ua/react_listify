import { Currencies } from './app.enums';

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
  units: string;
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
