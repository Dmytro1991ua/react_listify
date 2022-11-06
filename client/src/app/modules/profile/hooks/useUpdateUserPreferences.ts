import { authService } from '../../auth/auth.service';
import { ProfileFormsInitialValues } from '../profile.interfaces';

type ReturnedHookType = {
  onUpdateUserPreferences: (values: ProfileFormsInitialValues) => Promise<void | '' | undefined>;
};

export const useUpdateUserPreferences = (): ReturnedHookType => {
  async function onUpdateUserPreferences(values: ProfileFormsInitialValues): Promise<void | '' | undefined> {
    return (
      values.currentPassword &&
      values.newPassword &&
      values.confirmPassword &&
      (await authService.changeUserPassword(values.currentPassword, values.newPassword))
    );
  }

  return { onUpdateUserPreferences };
};
