import { authService } from './auth.service';
import { useAuthStore } from './auth.store';

export const validateUserAction = async (): Promise<void> => {
  const setUser = useAuthStore.getState().setUser;

  try {
    const validatedUser = await authService.validateUser();

    if (validatedUser) {
      setUser({
        uid: validatedUser?.uid,
        name: validatedUser?.name,
        email: validatedUser?.email,
        photoURL: validatedUser?.photoURL,
        phoneNumber: validatedUser?.phoneNumber,
        emailVerified: validatedUser?.emailVerified,
      });
    } else {
      setUser(null);
    }
  } catch (error) {
    setUser(null);
    throw new Error((error as Error).message);
  }
};
