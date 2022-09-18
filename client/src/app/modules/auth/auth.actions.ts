import { authService } from './auth.service';
import { useAuthStore } from './auth.store';

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
