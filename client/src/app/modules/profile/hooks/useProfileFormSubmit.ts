import { useUpdateUserInfo } from './useUpdateUserInfo';
import { useUpdateUserPreferences } from './useUpdateUserPreferences';
import { ProfileFormsInitialValues } from '../profile.interfaces';

type ReturnedHookType = {
  onProfileFormSubmit: (values: ProfileFormsInitialValues) => Promise<void>;
};

export const useProfileFormSubmit = (): ReturnedHookType => {
  const { onUpdateUserInfoAndPassword } = useUpdateUserInfo();
  const { onUpdateUserPreferences } = useUpdateUserPreferences();

  async function onProfileFormSubmit(values: ProfileFormsInitialValues): Promise<void> {
    try {
      await onUpdateUserInfoAndPassword(values);
      await onUpdateUserPreferences(values);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  return { onProfileFormSubmit };
};
