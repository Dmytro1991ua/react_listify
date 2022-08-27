import { authService } from './auth.service';
import { useAuthStore } from './auth.store';

export const validateUserAction = async (): Promise<void> => {
  const setUser = useAuthStore.getState().setUser;
  try {
    const validatedUser = await authService.validateUser();

    if (validatedUser) {
      setUser(validatedUser);
    }
  } catch (error) {
    setUser(null);
    throw new Error((error as Error).message);
  }
};
