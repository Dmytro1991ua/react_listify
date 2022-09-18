import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { ReactElement, useCallback, useEffect } from 'react';

import Routes from './app-routes';
import { auth } from './configs/firebase';
import { validateUserAction } from './modules/auth/auth.actions';
import { authService } from './modules/auth/auth.service';
import { useAuthStore } from './modules/auth/auth.store';
import { loadAvailableShoppingListsAction } from './modules/shopping-lists/shopping-lists.actions';

const App = (): ReactElement => {
  const setLoadingStatus = useAuthStore((state) => state.setUserLoadingStatus);

  const setCurrentUser = useCallback(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        getIdToken(user).then(async (token) => {
          authService.setToken(token);
        });

        const userFirebaseProviders: string[] = user.providerData.map((item) => item.providerId);

        await validateUserAction(userFirebaseProviders);
        await loadAvailableShoppingListsAction();
      }

      setLoadingStatus('idle');
    });
  }, [setLoadingStatus]);

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  return <Routes />;
};

export default App;
