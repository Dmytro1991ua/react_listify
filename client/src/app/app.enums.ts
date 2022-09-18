export enum AppRoutes {
  ShoppingLists = '/shopping-lists',
  ShoppingList = '/shopping-lists/:shoppingListId',
  SignIn = '/auth/sign-in',
  SignUp = '/auth/sign-up',
  ForgotPassword = '/auth/forgot-password',
  ResetPassword = '/auth/reset-password',
  Profile = '/profile',
  NotFound = '*',
}

export enum Currencies {
  Default = '',
  Dollar = '$',
  Euro = '€',
  Pound = '£',
  Hryvna = '₴',
  Zloty = 'zł',
  Ruble = '₽',
  JapaneseYen = '¥',
  SwissFranc = '₣',
  CanadianDollar = 'CA$',
}

export enum ProductUnits {
  Default = '',
  Liter = 'L',
  Kilogram = 'Kg',
  Gram = 'g',
  Milliliter = 'ml',
  Ounce = 'oz',
  Pound = 'lb',
  Gallon = 'gal',
}

export enum UserImageSize {
  Small = 's',
  Medium = 'm',
  Large = 'l',
}
