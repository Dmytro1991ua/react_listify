import { authService } from './auth.service';
import { useAuthStore } from './auth.store';
import { UpdateUserInformation } from '../../app.interfaces';

export const validateUserAction = async (firebaseProviders: string[]): Promise<void> => {
  const setUser = useAuthStore.getState().setUser;

  try {
    const validatedUser = await authService.validateUser();

    if (validatedUser) {
      setUser({ ...validatedUser, firebaseProviders });
    }
  } catch (error) {
    setUser(null);
    throw new Error((error as Error).message);
  }
};

export const updateUserDataAction = async (userData: UpdateUserInformation): Promise<void> => {
  const setLoadingStatus = useAuthStore.getState().setUserLoadingStatus;
  const updateUser = useAuthStore.getState().setUpdateUser;

  try {
    setLoadingStatus('loading');

    const updatedUserData = await authService.updateUserData(userData);

    if (updatedUserData) {
      updateUser(updatedUserData);
    }

    setLoadingStatus('idle');
  } catch (err) {
    setLoadingStatus('failed');
    throw new Error((err as Error).message);
  }
};
