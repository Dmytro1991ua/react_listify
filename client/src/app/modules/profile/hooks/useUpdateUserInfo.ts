import { updateUserDataAction } from '../../auth/auth.actions';
import { ProfileFormsInitialValues } from '../profile.interfaces';

type ReturnedHookType = {
  onUpdateUserInfoAndPassword: (values: ProfileFormsInitialValues) => Promise<false | void>;
};

export const useUpdateUserInfo = (): ReturnedHookType => {
  async function onUpdateUserInfoAndPassword(values: ProfileFormsInitialValues): Promise<false | void> {
    return (
      !values.currentPassword &&
      !values.newPassword &&
      !values.confirmPassword &&
      (await updateUserDataAction({
        name: values.name,
        photoURL: values.picture ?? '',
        currency: values.defaultCurrency,
        calculateByQuantity: values.calculatedPrice,
      }))
    );
  }

  return { onUpdateUserInfoAndPassword };
};
