import { Currencies } from '../../app.enums';

export interface ProfileFormsInitialValues {
  picture?: string | null;
  email?: string;
  name?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  calculatedPrice?: boolean;
  defaultCurrency?: Currencies;
}
