import { updateUserDataAction } from '../../auth/auth.actions';
import { authService } from '../../auth/auth.service';
import { ProfileFormsInitialValues } from '../profile.interfaces';

type ReturnedHookType = {
  onProfileFormSubmit: (values: ProfileFormsInitialValues) => Promise<void>;
};

export const useProfileFormSubmit = (): ReturnedHookType => {
  async function updateUserInfoAndPassword(values: ProfileFormsInitialValues): Promise<false | void> {
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

  async function updateUserPreferences(values: ProfileFormsInitialValues): Promise<void | '' | undefined> {
    return (
      values.currentPassword &&
      values.newPassword &&
      values.confirmPassword &&
      (await authService.changeUserPassword(values.currentPassword, values.newPassword))
    );
  }

  async function onProfileFormSubmit(values: ProfileFormsInitialValues): Promise<void> {
    try {
      await updateUserInfoAndPassword(values);
      await updateUserPreferences(values);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  return { onProfileFormSubmit };
};
