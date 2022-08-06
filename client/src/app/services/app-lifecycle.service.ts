import { useAuthStore } from '../modules/auth/auth.store';

class AppLifeCycleService {
  clearAppDataStorage(): void {
    useAuthStore.getState().reset();
  }
}

export const appLifeCycleService = new AppLifeCycleService();
