declare interface CurrentUser {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  phoneNumber?: string | null;
  emailVerified?: boolean;
}

declare interface Category {
  id: string | null;
  iconName: string;
  isCustom: boolean;
  label: string;
  value: string;
}
declare interface ShoppingListItem {
  _id?: string;
  name: string;
  category?: Category;
  quantity: number;
  units: string;
  price: number;
  isChecked?: boolean;
}

declare interface ShoppingList {
  _id?: string;
  name: string;
  currency: string;
  shoppingListItems: ShoppingListItem[];
}

declare type LoadingStatus = 'loading' | 'idle' | 'failed';
