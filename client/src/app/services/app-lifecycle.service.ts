import { useAuthStore } from '../modules/auth/auth.store';
import { useShoppingListsStore } from '../modules/shopping-lists/shopping-lists.store';

class AppLifeCycleService {
  clearAppDataStorage(): void {
    useAuthStore.getState().reset();
    useShoppingListsStore.getState().reset();
  }
}

export const appLifeCycleService = new AppLifeCycleService();
