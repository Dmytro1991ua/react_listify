import { getIdToken, onAuthStateChanged } from 'firebase/auth';
import { ReactElement, useCallback, useEffect } from 'react';

import Routes from './app-routes';
import { auth } from './configs/firebase';
import { authService } from './modules/auth/auth.service';
import { useAuthStore } from './modules/auth/auth.store';
import { useShoppingListsStore } from './modules/shopping-lists/shopping-lists.store';

const App = (): ReactElement => {
  const validateUser = useAuthStore((state) => state.validateUser);
  const setLoadingStatus = useAuthStore((state) => state.setUserLoadingStatus);

  const loadAvailableShoppingLists = useShoppingListsStore((state) => state.loadAvailableShoppingLists);

  const setCurrentUser = useCallback(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        getIdToken(user).then(async (token) => {
          authService.setToken(token);
        });

        await validateUser();
        await loadAvailableShoppingLists();
      }

      setLoadingStatus('idle');
    });
  }, [validateUser, setLoadingStatus, loadAvailableShoppingLists]);

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  return <Routes />;
};

export default App;
